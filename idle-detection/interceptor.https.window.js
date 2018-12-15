let service = (async function() {
  let load = Promise.resolve();
  [
    '/resources/chromium/mojo_bindings.js',
    '/resources/chromium/string16.mojom.js',
    '/resources/chromium/idle_manager.mojom.js',
  ].forEach(path => {
    let script = document.createElement('script');
    script.src = path;
    script.async = false;
    load = load.then(() => new Promise(resolve => {
      script.onload = resolve;
    }));
    document.head.appendChild(script);
  });

  return load.then(intercept);
})();

function intercept() {
  let result = {
    addMonitor(threshold, monitorPtr, callback) {
      return this.handler.addMonitor(threshold, monitorPtr);
    },
    setHandler(handler) {
      this.handler = handler;
      return this;
    },
    isBound() {
      return binding.isBound();
    },
    close() {
      binding.close();
    }
  };

  // let binding = new mojo.BindingSet(blink.mojom.IdleManager);
  let binding = new mojo.Binding(blink.mojom.IdleManager, result);
  let interceptor = new MojoInterfaceInterceptor(blink.mojom.IdleManager.name);
  interceptor.oninterfacerequest = (e) => {
    binding.bind(e.handle);
  }

  interceptor.start();
  return result;
}

promise_test(async t => {
  let interceptor = await service;

  interceptor.setHandler({
    addMonitor(threshold, monitorPtr) {
      return Promise.resolve(blink.mojom.IdleState.ACTIVE);
    }
  });

  let status = await navigator.idle.query({threshold: 10});

  assert_equals(status.state, "active");

}, 'query()');

promise_test(async t => {
  let interceptor = await service;

  interceptor.setHandler({
    addMonitor(threshold, monitorPtr) {
      setTimeout(() => {
        monitorPtr.update(blink.mojom.IdleState.IDLE);
      }, 0);
      return Promise.resolve({state: blink.mojom.IdleState.ACTIVE});
    }
  });

  let monitor = await navigator.idle.query({threshold: 10});

  await new Promise(function(resolve, reject) {
    monitor.addEventListener("change", (e) => { resolve(e) });
  });

  assert_equals(monitor.state, "idle");
}, 'updates once');


promise_test(async t => {
  let interceptor = await service;

  interceptor.setHandler({
    addMonitor(threshold, monitorPtr) {
      // Updates the client once with the user idle.
      setTimeout(() => {
        monitorPtr.update(blink.mojom.IdleState.IDLE);
      }, 0);
      // Updates the client a second time with the user active.
      setTimeout(() => {
        monitorPtr.update(blink.mojom.IdleState.ACTIVE);
      }, 1);
      return Promise.resolve({state: blink.mojom.IdleState.ACTIVE});
    }
  });

  let monitor = await navigator.idle.query({threshold: 10});

  // waits for the first event.
  await new Promise(function(resolve, reject) {
    monitor.addEventListener("change", (e) => { resolve(e) }, {once: true});
  });

  // waits for the second event.
  await new Promise(function(resolve, reject) {
    monitor.addEventListener("change", (e) => { resolve(e) }, {once: true});
  });

  assert_equals(monitor.state, "active");
}, 'updates twice');

promise_test(async t => {
  let interceptor = await service;

  interceptor.setHandler({
    addMonitor(threshold, monitorPtr) {
      return Promise.resolve({state: blink.mojom.IdleState.LOCKED});
    }
  });

  let monitor = await navigator.idle.query({threshold: 10});

  assert_equals(monitor.state, "locked");
}, 'locked screen');

promise_test(async t => {
  let interceptor = await service;

  interceptor.setHandler({
    addMonitor(threshold, monitorPtr) {
      return Promise.resolve({state: blink.mojom.IdleState.ACTIVE});
    }
  });

  // TODO(goto): how do I force IdleStatus::ContextDestroyed, ::Pause or
  // ::Unpause to be called? I tried leaving this out of scope, but this fails.
  forcing_monitor_to_go_out_of_scope_block: {
    let monitor = navigator.idle.query({threshold: 10});
    assert_true(interceptor.isBound());
  }

  // assert_false(interceptor.isBound());

}, 'connection closes on gc()');

promise_test(async t => {
  let interceptor = await service;

  interceptor.setHandler({
    addMonitor(threshold, monitorPtr) {
      return new Promise(function(resolve, reject) {
        // leave the renderer deliberately hanging by not resolve()-ing.
      });
    }
  });

  let error = new Promise(function(resolve, reject) {
    navigator.idle.query({threshold: 10})
      .then((e) => {reject("unexpected response :(")})
      .catch((e) => {resolve(e.message)});
  });

  // simulates a browser crash by closing/disconnecting the mojo pipe.
  interceptor.close();

  assert_equals(await error, "cannot monitor idle");

}, 'browser crashes');
