// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

(function() {
  var mojomId = 'third_party/blink/public/mojom/idle/idle_manager.mojom';
  if (mojo.internal.isMojomLoaded(mojomId)) {
    console.warn('The following mojom is loaded multiple times: ' + mojomId);
    return;
  }
  mojo.internal.markMojomLoaded(mojomId);
  var bindings = mojo;
  var associatedBindings = mojo;
  var codec = mojo.internal;
  var validator = mojo.internal;

  var exports = mojo.internal.exposeNamespace('blink.mojom');


  var IdleState = {};
  IdleState.ACTIVE = 0;
  IdleState.IDLE = IdleState.ACTIVE + 1;
  IdleState.LOCKED = IdleState.IDLE + 1;
  IdleState.MIN_VALUE = 0,
  IdleState.MAX_VALUE = 2,

  IdleState.isKnownEnumValue = function(value) {
    switch (value) {
    case 0:
    case 1:
    case 2:
      return true;
    }
    return false;
  };

  IdleState.validate = function(enumValue) {
    var isExtensible = false;
    if (isExtensible || this.isKnownEnumValue(enumValue))
      return validator.validationError.NONE;

    return validator.validationError.UNKNOWN_ENUM_VALUE;
  };

  function IdleMonitor_Update_Params(values) {
    this.initDefaults_();
    this.initFields_(values);
  }


  IdleMonitor_Update_Params.prototype.initDefaults_ = function() {
    this.state = 0;
  };
  IdleMonitor_Update_Params.prototype.initFields_ = function(fields) {
    for(var field in fields) {
        if (this.hasOwnProperty(field))
          this[field] = fields[field];
    }
  };

  IdleMonitor_Update_Params.validate = function(messageValidator, offset) {
    var err;
    err = messageValidator.validateStructHeader(offset, codec.kStructHeaderSize);
    if (err !== validator.validationError.NONE)
        return err;

    var kVersionSizes = [
      {version: 0, numBytes: 16}
    ];
    err = messageValidator.validateStructVersion(offset, kVersionSizes);
    if (err !== validator.validationError.NONE)
        return err;


    // validate IdleMonitor_Update_Params.state
    err = messageValidator.validateEnum(offset + codec.kStructHeaderSize + 0, IdleState);
    if (err !== validator.validationError.NONE)
        return err;

    return validator.validationError.NONE;
  };

  IdleMonitor_Update_Params.encodedSize = codec.kStructHeaderSize + 8;

  IdleMonitor_Update_Params.decode = function(decoder) {
    var packed;
    var val = new IdleMonitor_Update_Params();
    var numberOfBytes = decoder.readUint32();
    var version = decoder.readUint32();
    val.state = decoder.decodeStruct(codec.Int32);
    decoder.skip(1);
    decoder.skip(1);
    decoder.skip(1);
    decoder.skip(1);
    return val;
  };

  IdleMonitor_Update_Params.encode = function(encoder, val) {
    var packed;
    encoder.writeUint32(IdleMonitor_Update_Params.encodedSize);
    encoder.writeUint32(0);
    encoder.encodeStruct(codec.Int32, val.state);
    encoder.skip(1);
    encoder.skip(1);
    encoder.skip(1);
    encoder.skip(1);
  };
  function IdleManager_AddMonitor_Params(values) {
    this.initDefaults_();
    this.initFields_(values);
  }


  IdleManager_AddMonitor_Params.prototype.initDefaults_ = function() {
    this.threshold = 0;
    this.monitor = new IdleMonitorPtr();
  };
  IdleManager_AddMonitor_Params.prototype.initFields_ = function(fields) {
    for(var field in fields) {
        if (this.hasOwnProperty(field))
          this[field] = fields[field];
    }
  };

  IdleManager_AddMonitor_Params.validate = function(messageValidator, offset) {
    var err;
    err = messageValidator.validateStructHeader(offset, codec.kStructHeaderSize);
    if (err !== validator.validationError.NONE)
        return err;

    var kVersionSizes = [
      {version: 0, numBytes: 24}
    ];
    err = messageValidator.validateStructVersion(offset, kVersionSizes);
    if (err !== validator.validationError.NONE)
        return err;



    // validate IdleManager_AddMonitor_Params.monitor
    err = messageValidator.validateInterface(offset + codec.kStructHeaderSize + 4, false);
    if (err !== validator.validationError.NONE)
        return err;

    return validator.validationError.NONE;
  };

  IdleManager_AddMonitor_Params.encodedSize = codec.kStructHeaderSize + 16;

  IdleManager_AddMonitor_Params.decode = function(decoder) {
    var packed;
    var val = new IdleManager_AddMonitor_Params();
    var numberOfBytes = decoder.readUint32();
    var version = decoder.readUint32();
    val.threshold = decoder.decodeStruct(codec.Uint32);
    val.monitor = decoder.decodeStruct(new codec.Interface(IdleMonitorPtr));
    decoder.skip(1);
    decoder.skip(1);
    decoder.skip(1);
    decoder.skip(1);
    return val;
  };

  IdleManager_AddMonitor_Params.encode = function(encoder, val) {
    var packed;
    encoder.writeUint32(IdleManager_AddMonitor_Params.encodedSize);
    encoder.writeUint32(0);
    encoder.encodeStruct(codec.Uint32, val.threshold);
    encoder.encodeStruct(new codec.Interface(IdleMonitorPtr), val.monitor);
    encoder.skip(1);
    encoder.skip(1);
    encoder.skip(1);
    encoder.skip(1);
  };
  function IdleManager_AddMonitor_ResponseParams(values) {
    this.initDefaults_();
    this.initFields_(values);
  }


  IdleManager_AddMonitor_ResponseParams.prototype.initDefaults_ = function() {
    this.state = 0;
  };
  IdleManager_AddMonitor_ResponseParams.prototype.initFields_ = function(fields) {
    for(var field in fields) {
        if (this.hasOwnProperty(field))
          this[field] = fields[field];
    }
  };

  IdleManager_AddMonitor_ResponseParams.validate = function(messageValidator, offset) {
    var err;
    err = messageValidator.validateStructHeader(offset, codec.kStructHeaderSize);
    if (err !== validator.validationError.NONE)
        return err;

    var kVersionSizes = [
      {version: 0, numBytes: 16}
    ];
    err = messageValidator.validateStructVersion(offset, kVersionSizes);
    if (err !== validator.validationError.NONE)
        return err;


    // validate IdleManager_AddMonitor_ResponseParams.state
    err = messageValidator.validateEnum(offset + codec.kStructHeaderSize + 0, IdleState);
    if (err !== validator.validationError.NONE)
        return err;

    return validator.validationError.NONE;
  };

  IdleManager_AddMonitor_ResponseParams.encodedSize = codec.kStructHeaderSize + 8;

  IdleManager_AddMonitor_ResponseParams.decode = function(decoder) {
    var packed;
    var val = new IdleManager_AddMonitor_ResponseParams();
    var numberOfBytes = decoder.readUint32();
    var version = decoder.readUint32();
    val.state = decoder.decodeStruct(codec.Int32);
    decoder.skip(1);
    decoder.skip(1);
    decoder.skip(1);
    decoder.skip(1);
    return val;
  };

  IdleManager_AddMonitor_ResponseParams.encode = function(encoder, val) {
    var packed;
    encoder.writeUint32(IdleManager_AddMonitor_ResponseParams.encodedSize);
    encoder.writeUint32(0);
    encoder.encodeStruct(codec.Int32, val.state);
    encoder.skip(1);
    encoder.skip(1);
    encoder.skip(1);
    encoder.skip(1);
  };
  var kIdleMonitor_Update_Name = 0;

  function IdleMonitorPtr(handleOrPtrInfo) {
    this.ptr = new bindings.InterfacePtrController(IdleMonitor,
                                                   handleOrPtrInfo);
  }

  function IdleMonitorAssociatedPtr(associatedInterfacePtrInfo) {
    this.ptr = new associatedBindings.AssociatedInterfacePtrController(
        IdleMonitor, associatedInterfacePtrInfo);
  }

  IdleMonitorAssociatedPtr.prototype =
      Object.create(IdleMonitorPtr.prototype);
  IdleMonitorAssociatedPtr.prototype.constructor =
      IdleMonitorAssociatedPtr;

  function IdleMonitorProxy(receiver) {
    this.receiver_ = receiver;
  }
  IdleMonitorPtr.prototype.update = function() {
    return IdleMonitorProxy.prototype.update
        .apply(this.ptr.getProxy(), arguments);
  };

  IdleMonitorProxy.prototype.update = function(state) {
    var params_ = new IdleMonitor_Update_Params();
    params_.state = state;
    var builder = new codec.MessageV0Builder(
        kIdleMonitor_Update_Name,
        codec.align(IdleMonitor_Update_Params.encodedSize));
    builder.encodeStruct(IdleMonitor_Update_Params, params_);
    var message = builder.finish();
    this.receiver_.accept(message);
  };

  function IdleMonitorStub(delegate) {
    this.delegate_ = delegate;
  }
  IdleMonitorStub.prototype.update = function(state) {
    return this.delegate_ && this.delegate_.update && this.delegate_.update(state);
  }

  IdleMonitorStub.prototype.accept = function(message) {
    var reader = new codec.MessageReader(message);
    switch (reader.messageName) {
    case kIdleMonitor_Update_Name:
      var params = reader.decodeStruct(IdleMonitor_Update_Params);
      this.update(params.state);
      return true;
    default:
      return false;
    }
  };

  IdleMonitorStub.prototype.acceptWithResponder =
      function(message, responder) {
    var reader = new codec.MessageReader(message);
    switch (reader.messageName) {
    default:
      return false;
    }
  };

  function validateIdleMonitorRequest(messageValidator) {
    var message = messageValidator.message;
    var paramsClass = null;
    switch (message.getName()) {
      case kIdleMonitor_Update_Name:
        if (!message.expectsResponse() && !message.isResponse())
          paramsClass = IdleMonitor_Update_Params;
      break;
    }
    if (paramsClass === null)
      return validator.validationError.NONE;
    return paramsClass.validate(messageValidator, messageValidator.message.getHeaderNumBytes());
  }

  function validateIdleMonitorResponse(messageValidator) {
    return validator.validationError.NONE;
  }

  var IdleMonitor = {
    name: 'blink.mojom.IdleMonitor',
    kVersion: 0,
    ptrClass: IdleMonitorPtr,
    proxyClass: IdleMonitorProxy,
    stubClass: IdleMonitorStub,
    validateRequest: validateIdleMonitorRequest,
    validateResponse: null,
  };
  IdleMonitorStub.prototype.validator = validateIdleMonitorRequest;
  IdleMonitorProxy.prototype.validator = null;
  var kIdleManager_AddMonitor_Name = 0;

  function IdleManagerPtr(handleOrPtrInfo) {
    this.ptr = new bindings.InterfacePtrController(IdleManager,
                                                   handleOrPtrInfo);
  }

  function IdleManagerAssociatedPtr(associatedInterfacePtrInfo) {
    this.ptr = new associatedBindings.AssociatedInterfacePtrController(
        IdleManager, associatedInterfacePtrInfo);
  }

  IdleManagerAssociatedPtr.prototype =
      Object.create(IdleManagerPtr.prototype);
  IdleManagerAssociatedPtr.prototype.constructor =
      IdleManagerAssociatedPtr;

  function IdleManagerProxy(receiver) {
    this.receiver_ = receiver;
  }
  IdleManagerPtr.prototype.addMonitor = function() {
    return IdleManagerProxy.prototype.addMonitor
        .apply(this.ptr.getProxy(), arguments);
  };

  IdleManagerProxy.prototype.addMonitor = function(threshold, monitor) {
    var params_ = new IdleManager_AddMonitor_Params();
    params_.threshold = threshold;
    params_.monitor = monitor;
    return new Promise(function(resolve, reject) {
      var builder = new codec.MessageV1Builder(
          kIdleManager_AddMonitor_Name,
          codec.align(IdleManager_AddMonitor_Params.encodedSize),
          codec.kMessageExpectsResponse, 0);
      builder.encodeStruct(IdleManager_AddMonitor_Params, params_);
      var message = builder.finish();
      this.receiver_.acceptAndExpectResponse(message).then(function(message) {
        var reader = new codec.MessageReader(message);
        var responseParams =
            reader.decodeStruct(IdleManager_AddMonitor_ResponseParams);
        resolve(responseParams);
      }).catch(function(result) {
        reject(Error("Connection error: " + result));
      });
    }.bind(this));
  };

  function IdleManagerStub(delegate) {
    this.delegate_ = delegate;
  }
  IdleManagerStub.prototype.addMonitor = function(threshold, monitor) {
    return this.delegate_ && this.delegate_.addMonitor && this.delegate_.addMonitor(threshold, monitor);
  }

  IdleManagerStub.prototype.accept = function(message) {
    var reader = new codec.MessageReader(message);
    switch (reader.messageName) {
    default:
      return false;
    }
  };

  IdleManagerStub.prototype.acceptWithResponder =
      function(message, responder) {
    var reader = new codec.MessageReader(message);
    switch (reader.messageName) {
    case kIdleManager_AddMonitor_Name:
      var params = reader.decodeStruct(IdleManager_AddMonitor_Params);
      this.addMonitor(params.threshold, params.monitor).then(function(response) {
        var responseParams =
            new IdleManager_AddMonitor_ResponseParams();
        responseParams.state = response.state;
        var builder = new codec.MessageV1Builder(
            kIdleManager_AddMonitor_Name,
            codec.align(IdleManager_AddMonitor_ResponseParams.encodedSize),
            codec.kMessageIsResponse, reader.requestID);
        builder.encodeStruct(IdleManager_AddMonitor_ResponseParams,
                             responseParams);
        var message = builder.finish();
        responder.accept(message);
      });
      return true;
    default:
      return false;
    }
  };

  function validateIdleManagerRequest(messageValidator) {
    var message = messageValidator.message;
    var paramsClass = null;
    switch (message.getName()) {
      case kIdleManager_AddMonitor_Name:
        if (message.expectsResponse())
          paramsClass = IdleManager_AddMonitor_Params;
      break;
    }
    if (paramsClass === null)
      return validator.validationError.NONE;
    return paramsClass.validate(messageValidator, messageValidator.message.getHeaderNumBytes());
  }

  function validateIdleManagerResponse(messageValidator) {
   var message = messageValidator.message;
   var paramsClass = null;
   switch (message.getName()) {
      case kIdleManager_AddMonitor_Name:
        if (message.isResponse())
          paramsClass = IdleManager_AddMonitor_ResponseParams;
        break;
    }
    if (paramsClass === null)
      return validator.validationError.NONE;
    return paramsClass.validate(messageValidator, messageValidator.message.getHeaderNumBytes());
  }

  var IdleManager = {
    name: 'blink.mojom.IdleManager',
    kVersion: 0,
    ptrClass: IdleManagerPtr,
    proxyClass: IdleManagerProxy,
    stubClass: IdleManagerStub,
    validateRequest: validateIdleManagerRequest,
    validateResponse: validateIdleManagerResponse,
  };
  IdleManagerStub.prototype.validator = validateIdleManagerRequest;
  IdleManagerProxy.prototype.validator = validateIdleManagerResponse;
  exports.IdleState = IdleState;
  exports.IdleMonitor = IdleMonitor;
  exports.IdleMonitorPtr = IdleMonitorPtr;
  exports.IdleMonitorAssociatedPtr = IdleMonitorAssociatedPtr;
  exports.IdleManager = IdleManager;
  exports.IdleManagerPtr = IdleManagerPtr;
  exports.IdleManagerAssociatedPtr = IdleManagerAssociatedPtr;
})();