/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 321);
/******/ })
/************************************************************************/
/******/ ({

/***/ 100:
/***/ (function(module, exports) {

module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}

/***/ }),

/***/ 101:
/***/ (function(module, exports) {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}


/***/ }),

/***/ 102:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return readByte; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return readI16; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return readI32; });
/* unused harmony export writeI16 */
/* unused harmony export writeI32 */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return readDouble; });
/* unused harmony export writeDouble */
var POW_8 = Math.pow(2, 8);
var POW_16 = Math.pow(2, 16);
var POW_24 = Math.pow(2, 24);
var POW_32 = Math.pow(2, 32);
var POW_40 = Math.pow(2, 40);
var POW_48 = Math.pow(2, 48);
var POW_52 = Math.pow(2, 52);
var POW_1022 = Math.pow(2, 1022);
var readByte = function (b) {
    return b > 127 ? b - 256 : b;
};
var readI16 = function (buf, offset) {
    offset = offset || 0;
    var v = buf[offset + 1];
    v += buf[offset] << 8;
    if (buf[offset] & 128) {
        v -= POW_16;
    }
    return v;
};
var readI32 = function (buf, offset) {
    offset = offset || 0;
    var v = buf[offset + 3];
    v += buf[offset + 2] << 8;
    v += buf[offset + 1] << 16;
    v += buf[offset] * POW_24;
    if (buf[offset] & 0x80) {
        v -= POW_32;
    }
    return v;
};
var writeI16 = function (buf, v) {
    buf[1] = v & 0xff;
    v >>= 8;
    buf[0] = v & 0xff;
    return buf;
};
var writeI32 = function (buf, v) {
    buf[3] = v & 0xff;
    v >>= 8;
    buf[2] = v & 0xff;
    v >>= 8;
    buf[1] = v & 0xff;
    v >>= 8;
    buf[0] = v & 0xff;
    return buf;
};
var readDouble = function (buf, offset) {
    offset = offset || 0;
    var signed = buf[offset] & 0x80;
    var e = (buf[offset + 1] & 0xF0) >> 4;
    e += (buf[offset] & 0x7F) << 4;
    var m = buf[offset + 7];
    m += buf[offset + 6] << 8;
    m += buf[offset + 5] << 16;
    m += buf[offset + 4] * POW_24;
    m += buf[offset + 3] * POW_32;
    m += buf[offset + 2] * POW_40;
    m += (buf[offset + 1] & 0x0F) * POW_48;
    switch (e) {
        case 0:
            e = -1022;
            break;
        case 2047:
            return m ? NaN : (signed ? -Infinity : Infinity);
        default:
            m += POW_52;
            e -= 1023;
    }
    if (signed) {
        m *= -1;
    }
    return m * Math.pow(2, e - 52);
};
var writeDouble = function (buf, v) {
    var m, e, c;
    buf[0] = (v < 0 ? 0x80 : 0x00);
    v = Math.abs(v);
    if (v !== v) {
        m = 2251799813685248;
        e = 2047;
    }
    else if (v === Infinity) {
        m = 0;
        e = 2047;
    }
    else {
        e = Math.floor(Math.log(v) / Math.LN2);
        c = Math.pow(2, -e);
        if (v * c < 1) {
            e--;
            c *= 2;
        }
        if (e + 1023 >= 2047) {
            m = 0;
            e = 2047;
        }
        else if (e + 1023 >= 1) {
            m = (v * c - 1) * POW_52;
            e += 1023;
        }
        else {
            m = (v * POW_1022) * POW_52;
            e = 0;
        }
    }
    buf[1] = (e << 4) & 0xf0;
    buf[0] |= (e >> 4) & 0x7f;
    buf[7] = m & 0xff;
    m = Math.floor(m / POW_8);
    buf[6] = m & 0xff;
    m = Math.floor(m / POW_8);
    buf[5] = m & 0xff;
    m = Math.floor(m / POW_8);
    buf[4] = m & 0xff;
    m >>= 8;
    buf[3] = m & 0xff;
    m >>= 8;
    buf[2] = m & 0xff;
    m >>= 8;
    buf[1] |= m & 0x0f;
    return buf;
};


/***/ }),

/***/ 103:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_events__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_events___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_events__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_buffer__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_buffer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_buffer__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__transport_buffer__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__protocol_json__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__thrift_type__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__error__ = __webpack_require__(21);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();






var WSConnection = (function (_super) {
    __extends(WSConnection, _super);
    function WSConnection(host, port, options) {
        var _this = _super.call(this) || this;
        _this.send_pending = [];
        _this.seqId2Service = {};
        _this.uri = function () {
            var scheme = _this.secure ? 'wss' : 'ws';
            var port = '';
            var path = _this.path || '/';
            var host = _this.host;
            if (_this.port && (('wss' === scheme && _this.port !== 443) ||
                ('ws' === scheme && _this.port != 80))) {
                port = ':' + _this.port;
            }
            return scheme + '://' + host + port + path;
        };
        _this._reset = function () {
            _this.socket = null;
            _this.send_pending = [];
        };
        _this._onOpen = function () {
            _this.emit('open');
            if (_this.send_pending.length > 0) {
                _this.send_pending.forEach(function (data) {
                    _this.socket.send(data);
                });
            }
        };
        _this._onClose = function () {
            _this.emit('close');
            _this._reset();
        };
        _this._onData = function (data) {
            if (Object.prototype.toString.call(data) === '[object ArrayBuffer') {
                data = new Uint8Array(data);
            }
            var buf = new __WEBPACK_IMPORTED_MODULE_1_buffer__["Buffer"](data);
            _this.transport.receiver(_this._decodeCallback.bind(_this))(buf);
        };
        _this._onMessage = function (evt) {
            _this._onData(evt.data);
        };
        _this._onError = function (evt) {
            _this.emit('error', evt);
            _this.socket.close();
        };
        _this.isOpen = function () {
            return _this.socket && _this.socket.readyState === _this.socket.OPEN;
        };
        _this.open = function () {
            if (_this.socket && _this.socket.readyState !== _this.socket.CLOSED) {
                return;
            }
            _this.socket = new WebSocket(_this.uri());
            _this.socket.binaryType = 'arraybuffer';
            _this.socket.onopen = _this._onOpen;
            _this.socket.onmessage = _this._onMessage;
            _this.socket.onerror = _this._onError;
            _this.socket.onclose = _this._onClose;
        };
        _this.close = function () {
            _this.socket.close();
        };
        _this.write = function (data) {
            if (_this.isOpen()) {
                _this.socket.send(data);
            }
            else {
                _this.send_pending.push(data);
            }
        };
        _this._decodeCallback = function (trans) {
            var proto = new _this.protocol(trans);
            try {
                var _loop_1 = function () {
                    var header = proto.readMessageBegin();
                    var client = _this.clients[header.rseqid] || null;
                    if (!client) {
                        _this.emit("error", new __WEBPACK_IMPORTED_MODULE_5__error__["b" /* TApplicationException */](__WEBPACK_IMPORTED_MODULE_4__thrift_type__["b" /* TApplicationExceptionType */].MISSING_SERVICE_CLIENT, "Received a response to an unknown service client"));
                    }
                    delete _this.clients[header.rseqid];
                    var clientWrappedCb = function (err, success) {
                        trans.commitPosition();
                        var clientCb = client.reqs[header.rseqid];
                        delete client.reqs[header.rseqid];
                        if (clientCb) {
                            clientCb(err, success);
                        }
                    };
                    if (client["recv_" + header.fname]) {
                        var dummy_seqid = header.rseqid * -1;
                        client.reqs[dummy_seqid] = clientWrappedCb;
                        client["recv_" + header.fname](proto, header.mtype, dummy_seqid);
                    }
                    else {
                        _this.emit("error", new __WEBPACK_IMPORTED_MODULE_5__error__["b" /* TApplicationException */](__WEBPACK_IMPORTED_MODULE_4__thrift_type__["b" /* TApplicationExceptionType */].WRONG_METHOD_NAME, "Received a response to an unknown RPC function"));
                    }
                };
                while (true) {
                    _loop_1();
                }
            }
            catch (e) {
                if (e instanceof __WEBPACK_IMPORTED_MODULE_5__error__["a" /* InputBufferUnderrunError */]) {
                    trans.rollbackPosition();
                }
                else {
                    throw e;
                }
            }
        };
        _this.host = host;
        _this.port = port;
        _this.secure = !!options.secure || false;
        _this.transport = options.transport || __WEBPACK_IMPORTED_MODULE_2__transport_buffer__["a" /* default */];
        _this.protocol = options.protocol || __WEBPACK_IMPORTED_MODULE_3__protocol_json__["a" /* default */];
        _this.path = options.path || '/';
        _this.clients = {};
        return _this;
    }
    return WSConnection;
}(__WEBPACK_IMPORTED_MODULE_0_events__["EventEmitter"]));
var createWSConnection = function (host, port, options) {
    return new WSConnection(host, port, options);
};
/* harmony default export */ __webpack_exports__["a"] = (createWSConnection);


/***/ }),

/***/ 104:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_events__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_events___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_events__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_buffer__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_buffer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_buffer__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__transport_buffer__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__protocol_json__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__thrift_type__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__error__ = __webpack_require__(21);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();






var XHRConnection = (function (_super) {
    __extends(XHRConnection, _super);
    function XHRConnection(host, port, options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this) || this;
        _this.seqId2Service = {};
        _this.uri = function () {
            var scheme = _this.secure ? 'https' : 'http';
            var port = '';
            var path = _this.path || '/';
            var host = _this.host;
            if (_this.port && (('https' === scheme && _this.port !== 443) ||
                ('http' === scheme && _this.port != 80))) {
                port = ':' + _this.port;
            }
            return scheme + '://' + host + port + path;
        };
        _this.getXmlHttpRequestObject = function () {
            try {
                return new XMLHttpRequest();
            }
            catch (e) { }
            try {
                return new ActiveXObject('Msxml2.XMLHTTP');
            }
            catch (e) { }
            try {
                return new ActiveXObject('Microsoft.XMLHTTP');
            }
            catch (e) { }
            throw new Error('Your browser does not support XHR.');
        };
        _this._onOpen = function () { };
        _this._onClose = function () { };
        _this._onData = function (data) {
            if (Object.prototype.toString.call(data) === '[object ArrayBuffer') {
                data = new Uint8Array(data);
            }
            var buf = new __WEBPACK_IMPORTED_MODULE_1_buffer__["Buffer"](data);
            _this.transport.receiver(_this._decodeCallback.bind(_this))(buf);
        };
        _this._onMessage = function (evt) {
            _this._onData(evt.data);
        };
        _this._onError = function (evt) {
            _this.emit("error", evt);
        };
        _this.isOpen = function () {
            return true;
        };
        _this.open = function () { };
        _this.xhr = function (data) {
            var xreq = _this.getXmlHttpRequestObject();
            if (xreq["overrideMimeType"]) {
                xreq["overrideMimeType"]("application/json");
            }
            xreq.onreadystatechange = function () {
                if (xreq.readyState === 4 && xreq.status === 200) {
                    _this._onData(xreq.responseText);
                }
                else if (xreq.readyState === 4) {
                    _this._onError(new Error(xreq.statusText));
                }
            };
            xreq.open("POST", _this.uri(), true);
            Object.keys(_this.headers).forEach(function (headerKey) {
                xreq.setRequestHeader(headerKey, _this.headers[headerKey]);
            });
            xreq.send(data);
        };
        _this.close = function () { };
        _this.write = function (data) {
            _this.xhr(data);
        };
        _this._decodeCallback = function (trans) {
            var proto = new _this.protocol(trans);
            try {
                var _loop_1 = function () {
                    var header = proto.readMessageBegin();
                    var client = _this.clients[header.rseqid] || null;
                    if (!client) {
                        _this.emit("error", new __WEBPACK_IMPORTED_MODULE_5__error__["b" /* TApplicationException */](__WEBPACK_IMPORTED_MODULE_4__thrift_type__["b" /* TApplicationExceptionType */].MISSING_SERVICE_CLIENT, "Received a response to an unknown service client"));
                    }
                    delete _this.clients[header.rseqid];
                    var clientWrappedCb = function (err, success) {
                        trans.commitPosition();
                        var clientCb = client.reqs[header.rseqid];
                        delete client.reqs[header.rseqid];
                        if (clientCb) {
                            clientCb(err, success);
                        }
                    };
                    if (client["recv_" + header.fname]) {
                        var dummy_seqid = header.rseqid * -1;
                        client.reqs[dummy_seqid] = clientWrappedCb;
                        client["recv_" + header.fname](proto, header.mtype, dummy_seqid);
                    }
                    else {
                        _this.emit("error", new __WEBPACK_IMPORTED_MODULE_5__error__["b" /* TApplicationException */](__WEBPACK_IMPORTED_MODULE_4__thrift_type__["b" /* TApplicationExceptionType */].WRONG_METHOD_NAME, "Received a response to an unknown RPC function"));
                    }
                };
                while (true) {
                    _loop_1();
                }
            }
            catch (e) {
                if (e instanceof __WEBPACK_IMPORTED_MODULE_5__error__["a" /* InputBufferUnderrunError */]) {
                    trans.rollbackPosition();
                }
                else {
                    throw e;
                }
            }
        };
        _this.host = host;
        _this.port = port;
        _this.secure = !!options.secure || false;
        _this.transport = options.transport || __WEBPACK_IMPORTED_MODULE_2__transport_buffer__["a" /* default */];
        _this.protocol = options.protocol || __WEBPACK_IMPORTED_MODULE_3__protocol_json__["a" /* default */];
        _this.headers = options.headers || {};
        _this.path = options.path || '/';
        _this.clients = {};
        return _this;
    }
    return XHRConnection;
}(__WEBPACK_IMPORTED_MODULE_0_events__["EventEmitter"]));
var createXHRConnection = function (host, port, options) {
    return new XHRConnection(host, port, options);
};
/* harmony default export */ __webpack_exports__["a"] = (createXHRConnection);


/***/ }),

/***/ 105:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var createClient = (function () {
    var clientId = 0;
    return function (ServiceClient, connection) {
        clientId++;
        var flushCallback = function (buf) {
            connection.write(buf);
        };
        var transport = new connection.transport(flushCallback);
        var client = new ServiceClient(transport, connection.protocol);
        client.id = clientId;
        connection.clients[clientId] = client;
        return client;
    };
})();
/* harmony default export */ __webpack_exports__["a"] = (createClient);


/***/ }),

/***/ 21:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = InputBufferUnderrunError;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return TException; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return TApplicationException; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__thrift_type__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_util__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_util___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_util__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


function InputBufferUnderrunError(message) {
    Error.call(this);
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = message;
}
__WEBPACK_IMPORTED_MODULE_1_util__["inherits"](InputBufferUnderrunError, Error);
var TException = (function () {
    function TException(message) {
        var _this = this;
        this.getMessage = function () {
            return _this.message;
        };
        this.message = message;
        this.name = TException.name;
    }
    return TException;
}());

__WEBPACK_IMPORTED_MODULE_1_util__["inherits"](TException, Error);
var TApplicationException = (function (_super) {
    __extends(TApplicationException, _super);
    function TApplicationException(type, message) {
        var _this = _super.call(this, message) || this;
        _this.read = function (input) {
            while (1) {
                var ret = input.readFieldBegin();
                if (ret.ftype == __WEBPACK_IMPORTED_MODULE_0__thrift_type__["c" /* ThriftType */].STOP) {
                    break;
                }
                var fid = ret.fid;
                switch (fid) {
                    case 1:
                        if (ret.ftype == __WEBPACK_IMPORTED_MODULE_0__thrift_type__["c" /* ThriftType */].STRING) {
                            this.message = input.readString();
                        }
                        else {
                            ret = input.skip(ret.ftype);
                        }
                        break;
                    case 2:
                        if (ret.ftype == __WEBPACK_IMPORTED_MODULE_0__thrift_type__["c" /* ThriftType */].I32) {
                            this.code = input.readI32();
                        }
                        else {
                            ret = input.skip(ret.ftype);
                        }
                        break;
                    default:
                        ret = input.skip(ret.ftype);
                        break;
                }
                input.readFieldEnd();
            }
            input.readStructEnd();
        };
        _this.write = function (output) {
            output.writeStructBegin('TApplicationException');
            if (this.message) {
                output.writeFieldBegin('message', __WEBPACK_IMPORTED_MODULE_0__thrift_type__["c" /* ThriftType */].STRING, 1);
                output.writeString(this.getMessage());
                output.writeFieldEnd();
            }
            if (this.code) {
                output.writeFieldBegin('type', __WEBPACK_IMPORTED_MODULE_0__thrift_type__["c" /* ThriftType */].I32, 2);
                output.writeI32(this.code);
                output.writeFieldEnd();
            }
            output.writeFieldStop();
            output.writeStructEnd();
        };
        _this.getCode = function () {
            return this.code;
        };
        _this.name = TApplicationException.name;
        _this.type = __WEBPACK_IMPORTED_MODULE_0__thrift_type__["b" /* TApplicationExceptionType */].UNKNOWN;
        return _this;
    }
    return TApplicationException;
}(TException));



/***/ }),

/***/ 22:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return ThriftType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessageType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return TApplicationExceptionType; });
/* unused harmony export TProtocolExceptionType */
var ThriftType;
(function (ThriftType) {
    ThriftType[ThriftType["STOP"] = 0] = "STOP";
    ThriftType[ThriftType["VOID"] = 1] = "VOID";
    ThriftType[ThriftType["BOOL"] = 2] = "BOOL";
    ThriftType[ThriftType["BYTE"] = 3] = "BYTE";
    ThriftType[ThriftType["I08"] = 3] = "I08";
    ThriftType[ThriftType["DOUBLE"] = 4] = "DOUBLE";
    ThriftType[ThriftType["I16"] = 6] = "I16";
    ThriftType[ThriftType["I32"] = 8] = "I32";
    ThriftType[ThriftType["I64"] = 10] = "I64";
    ThriftType[ThriftType["STRING"] = 11] = "STRING";
    ThriftType[ThriftType["UTF7"] = 11] = "UTF7";
    ThriftType[ThriftType["STRUCT"] = 12] = "STRUCT";
    ThriftType[ThriftType["MAP"] = 13] = "MAP";
    ThriftType[ThriftType["SET"] = 14] = "SET";
    ThriftType[ThriftType["LIST"] = 15] = "LIST";
    ThriftType[ThriftType["UTF8"] = 16] = "UTF8";
    ThriftType[ThriftType["UTF16"] = 17] = "UTF16";
})(ThriftType || (ThriftType = {}));
var MessageType;
(function (MessageType) {
    MessageType[MessageType["CALL"] = 1] = "CALL";
    MessageType[MessageType["REPLY"] = 2] = "REPLY";
    MessageType[MessageType["EXCEPTION"] = 3] = "EXCEPTION";
    MessageType[MessageType["ONEWAY"] = 4] = "ONEWAY";
})(MessageType || (MessageType = {}));
var TApplicationExceptionType;
(function (TApplicationExceptionType) {
    TApplicationExceptionType[TApplicationExceptionType["UNKNOWN"] = 0] = "UNKNOWN";
    TApplicationExceptionType[TApplicationExceptionType["UNKNOWN_METHOD"] = 1] = "UNKNOWN_METHOD";
    TApplicationExceptionType[TApplicationExceptionType["INVALID_MESSAGE_TYPE"] = 2] = "INVALID_MESSAGE_TYPE";
    TApplicationExceptionType[TApplicationExceptionType["WRONG_METHOD_NAME"] = 3] = "WRONG_METHOD_NAME";
    TApplicationExceptionType[TApplicationExceptionType["BAD_SEQUENCE_ID"] = 4] = "BAD_SEQUENCE_ID";
    TApplicationExceptionType[TApplicationExceptionType["MISSING_RESULT"] = 5] = "MISSING_RESULT";
    TApplicationExceptionType[TApplicationExceptionType["INTERNAL_ERROR"] = 6] = "INTERNAL_ERROR";
    TApplicationExceptionType[TApplicationExceptionType["PROTOCOL_ERROR"] = 7] = "PROTOCOL_ERROR";
    TApplicationExceptionType[TApplicationExceptionType["INVALID_TRANSFORM"] = 8] = "INVALID_TRANSFORM";
    TApplicationExceptionType[TApplicationExceptionType["INVALID_PROTOCOL"] = 9] = "INVALID_PROTOCOL";
    TApplicationExceptionType[TApplicationExceptionType["UNSUPPORTED_CLIENT_TYPE"] = 10] = "UNSUPPORTED_CLIENT_TYPE";
    TApplicationExceptionType[TApplicationExceptionType["MISSING_SERVICE_CLIENT"] = 11] = "MISSING_SERVICE_CLIENT";
})(TApplicationExceptionType || (TApplicationExceptionType = {}));
var TProtocolExceptionType;
(function (TProtocolExceptionType) {
    TProtocolExceptionType[TProtocolExceptionType["UNKNOWN"] = 0] = "UNKNOWN";
    TProtocolExceptionType[TProtocolExceptionType["INVALID_DATA"] = 1] = "INVALID_DATA";
    TProtocolExceptionType[TProtocolExceptionType["NEGATIVE_SIZE"] = 2] = "NEGATIVE_SIZE";
    TProtocolExceptionType[TProtocolExceptionType["SIZE_LIMIT"] = 3] = "SIZE_LIMIT";
    TProtocolExceptionType[TProtocolExceptionType["BAD_VERSION"] = 4] = "BAD_VERSION";
    TProtocolExceptionType[TProtocolExceptionType["NOT_IMPLEMENTED"] = 5] = "NOT_IMPLEMENTED";
    TProtocolExceptionType[TProtocolExceptionType["DEPTH_LIMIT"] = 6] = "DEPTH_LIMIT";
})(TProtocolExceptionType || (TProtocolExceptionType = {}));


/***/ }),

/***/ 30:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(95)
var ieee754 = __webpack_require__(96)
var isArray = __webpack_require__(97)

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(34)))

/***/ }),

/***/ 321:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(322);


/***/ }),

/***/ 322:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tutorialService2__ = __webpack_require__(323);

window["Calculator2"] = __WEBPACK_IMPORTED_MODULE_0__tutorialService2__["a" /* default */];


/***/ }),

/***/ 323:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export INT32CONSTANT */
/* unused harmony export MAPCONSTANT */
/* unused harmony export Operation */
/* unused harmony export ping */
/* unused harmony export add */
/* unused harmony export calculate */
/* unused harmony export zip */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__request2__ = __webpack_require__(324);

var INT32CONSTANT = 9853;
var MAPCONSTANT = {
    hello: "world",
    goodnight: "moon"
};
var Operation;
(function (Operation) {
    Operation[Operation["ADD"] = 1] = "ADD";
    Operation[Operation["SUBTRACT"] = 2] = "SUBTRACT";
    Operation[Operation["MULTIPLY"] = 3] = "MULTIPLY";
    Operation[Operation["DIVIDE"] = 4] = "DIVIDE";
})(Operation || (Operation = {}));
function ping() {
    return __WEBPACK_IMPORTED_MODULE_0__request2__["a" /* default */]("Calculator.ping", {});
}
function add(num1, num2) {
    return __WEBPACK_IMPORTED_MODULE_0__request2__["a" /* default */]("Calculator.add", { num1: num1, num2: num2 });
}
function calculate(logid, w) {
    return __WEBPACK_IMPORTED_MODULE_0__request2__["a" /* default */]("Calculator.calculate", { logid: logid, w: w });
}
function zip() {
    return __WEBPACK_IMPORTED_MODULE_0__request2__["a" /* default */]("Calculator.zip", {});
}
/* harmony default export */ __webpack_exports__["a"] = ({
    ping: ping,
    add: add,
    calculate: calculate,
    zip: zip
});


/***/ }),

/***/ 324:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = thriftRPC;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__clients__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tmp__ = __webpack_require__(54);


var TJSONProtocol = __WEBPACK_IMPORTED_MODULE_1__tmp__["a" /* default */].TJSONProtocol, TBufferedTransport = __WEBPACK_IMPORTED_MODULE_1__tmp__["a" /* default */].TBufferedTransport, createWSConnection = __WEBPACK_IMPORTED_MODULE_1__tmp__["a" /* default */].createWSConnection, createXHRConnection = __WEBPACK_IMPORTED_MODULE_1__tmp__["a" /* default */].createXHRConnection, createClient = __WEBPACK_IMPORTED_MODULE_1__tmp__["a" /* default */].createClient;
var host = "localhost";
var port = 9090;
var createConnectionForService = function (serviceName) {
    var conn = createXHRConnection(host, port, {
        path: "/rpc/" + serviceName
    });
    conn.on("error", function (err) {
        console.dir(err);
    });
    return conn;
};
function thriftRPC(method, params) {
    var splits = method.split('.').filter(function (x) { return x !== ""; });
    if (splits.length < 2) {
        throw new Error("Invalid RPC method, the correct format is `ServiceName.MethodName`");
    }
    var service = splits[0];
    var func = splits[1];
    var client = createClient(__WEBPACK_IMPORTED_MODULE_0__clients__["a" /* default */][service], createConnectionForService(service));
    return new Promise(function (resolve, reject) {
        try {
            client[func].apply(client, Object.keys(params).map(function (key) { return params[key]; }).concat([function (err, result) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(result);
                    }
                }]));
        }
        catch (e) {
            reject(e);
        }
    });
}


/***/ }),

/***/ 34:
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 44:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__error__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__binary__ = __webpack_require__(102);


var TBufferedTransport = (function () {
    function TBufferedTransport(onFlushCb) {
        var _this = this;
        this.defaultBufSize = 1024;
        this.writeCursor = 0;
        this.readCursor = 0;
        this.inBuf = new Buffer(this.defaultBufSize);
        this.outBuffers = [];
        this.outCount = 0;
        this.commitPosition = function () {
            var unreadSize = _this.writeCursor - _this.readCursor;
            var bufSize = (unreadSize * 2 > _this.defaultBufSize) ? unreadSize * 2 : _this.defaultBufSize;
            var buf = new Buffer(bufSize);
            if (unreadSize > 0) {
                _this.inBuf.copy(buf, 0, _this.readCursor, _this.writeCursor);
            }
            _this.readCursor = 0;
            _this.writeCursor = unreadSize;
            _this.inBuf = buf;
        };
        this.rollbackPosition = function () {
            _this.readCursor = 0;
        };
        this.isOpen = function () {
            return true;
        };
        this.open = function () { };
        this.close = function () { };
        this.ensureAvaiable = function (len) {
            if (_this.readCursor + len > _this.writeCursor) {
                throw new __WEBPACK_IMPORTED_MODULE_0__error__["a" /* InputBufferUnderrunError */]("");
            }
        };
        this.read = function (len) {
            _this.ensureAvaiable(len);
            var buf = new Buffer(len);
            _this.inBuf.copy(buf, 0, _this.readCursor, _this.readCursor + len);
            _this.readCursor += len;
            return buf;
        };
        this.readByte = function () {
            _this.ensureAvaiable(1);
            return __WEBPACK_IMPORTED_MODULE_1__binary__["a" /* readByte */](_this.inBuf[_this.readCursor++]);
        };
        this.readI16 = function () {
            _this.ensureAvaiable(2);
            var i16 = __WEBPACK_IMPORTED_MODULE_1__binary__["c" /* readI16 */](_this.inBuf, _this.readCursor);
            _this.readCursor += 2;
            return i16;
        };
        this.readI32 = function () {
            _this.ensureAvaiable(4);
            var i32 = __WEBPACK_IMPORTED_MODULE_1__binary__["d" /* readI32 */](_this.inBuf, _this.readCursor);
            _this.readCursor += 4;
            return i32;
        };
        this.readDouble = function () {
            _this.ensureAvaiable(8);
            var dob = __WEBPACK_IMPORTED_MODULE_1__binary__["b" /* readDouble */](_this.inBuf, _this.readCursor);
            _this.readCursor += 8;
            return dob;
        };
        this.readString = function (len) {
            _this.ensureAvaiable(len);
            var str = _this.inBuf.toString("utf8", _this.readCursor, _this.readCursor + len);
            _this.readCursor += len;
            return str;
        };
        this.borrow = function () {
            return {
                buf: _this.inBuf,
                readIndex: _this.readCursor,
                writeIndex: _this.writeCursor
            };
        };
        this.consume = function (bytesConsumed) {
            _this.readCursor += bytesConsumed;
        };
        this.write = function (buf) {
            if (typeof buf === "string") {
                buf = new Buffer(buf, "utf8");
            }
            _this.outBuffers.push(buf);
            _this.outCount += buf.length;
        };
        this.flush = function () {
            if (_this.outCount < 1) {
                return;
            }
            var msg = new Buffer(_this.outCount);
            var pos = 0;
            _this.outBuffers.forEach(function (buf) {
                buf.copy(msg, pos, 0);
                pos += buf.length;
            });
            if (_this.onFlush) {
                _this.onFlush(msg);
            }
            _this.outBuffers = [];
            _this.outCount = 0;
        };
        this.onFlush = onFlushCb;
    }
    TBufferedTransport.receiver = function (callback, seqid) {
        var reader = new TBufferedTransport();
        return function (data) {
            if (reader.writeCursor + data.length > reader.inBuf.length) {
                var buf = new Buffer(reader.writeCursor + data.length);
                reader.inBuf.copy(buf, 0, 0, reader.writeCursor);
                reader.inBuf = buf;
            }
            data.copy(reader.inBuf, reader.writeCursor, 0);
            reader.writeCursor += data.length;
            callback(reader, seqid);
        };
    };
    return TBufferedTransport;
}());
/* harmony default export */ __webpack_exports__["a"] = (TBufferedTransport);

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(30).Buffer))

/***/ }),

/***/ 45:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__thrift_type__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_buffer__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_buffer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_buffer__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__error__ = __webpack_require__(21);



var TJSONProtocol = (function () {
    function TJSONProtocol(trans) {
        var _this = this;
        this.flush = function () {
            _this.writeToTransportIfStackIsFlushable();
            return _this.trans.flush();
        };
        this.writeToTransportIfStackIsFlushable = function () {
            if (_this.tstack.length === 1) {
                _this.trans.write(_this.tstack.pop());
            }
        };
        this.writeMessageBegin = function (name, messageType, seqId) {
            _this.tstack.push([TJSONProtocol.Version, "\"" + name + "\"", messageType, seqId]);
        };
        this.writeMessageEnd = function () {
            var obj = _this.tstack.pop();
            _this.wobj = _this.tstack.pop();
            _this.wobj.push(obj);
            _this.wbuf = "[" + _this.wobj.join(',') + "]";
            _this.trans.write(_this.wbuf);
        };
        this.writeStructBegin = function (name) {
            _this.tpos.push(_this.tstack.length);
            _this.tstack.push({});
        };
        this.writeStructEnd = function () {
            var p = _this.tpos.pop();
            var struct = _this.tstack[p];
            var str = '{';
            var first = true;
            for (var key in struct) {
                if (first) {
                    first = false;
                }
                else {
                    str += ',';
                }
                str += key + ":" + struct[key];
            }
            str += '}';
            _this.tstack[p] = str;
            _this.writeToTransportIfStackIsFlushable();
        };
        this.writeFieldBegin = function (name, fieldType, fieldId) {
            _this.tpos.push(_this.tstack.length);
            _this.tstack.push({
                fieldId: "\"" + fieldId + "\"",
                fieldType: TJSONProtocol.Type[fieldType]
            });
        };
        this.writeFieldEnd = function () {
            var value = _this.tstack.pop();
            var fieldInfo = _this.tstack.pop();
            if (':' + value === ':[object Object]') {
                _this.tstack[_this.tstack.length - 1][fieldInfo.fieldId] = "{" + fieldInfo.fieldType + ":" + JSON.stringify(value) + "}";
            }
            else {
                _this.tstack[_this.tstack.length - 1][fieldInfo.fieldId] = "{" + fieldInfo.fieldType + ":" + value + "}";
            }
            _this.tpos.pop();
            _this.writeToTransportIfStackIsFlushable();
        };
        this.writeFieldStop = function () {
        };
        this.writeMapBegin = function (keyType, valType, size) {
            _this.tpos.push(_this.tstack.length);
            _this.tstack.push([TJSONProtocol.Type[keyType], TJSONProtocol.Type[valType], 0]);
        };
        this.writeMapEnd = function () {
            var p = _this.tpos.pop();
            if (p === _this.tstack.length) {
                return;
            }
            if ((_this.tstack.length - p - 1) % 2 !== 0) {
                _this.tstack.push('');
            }
            var size = (_this.tstack.length - p - 1) / 2;
            _this.tstack[p][_this.tstack[p].length - 1] = size;
            var map = '}';
            var first = true;
            while (_this.tstack.length > p + 1) {
                var v = _this.tstack.pop();
                var k = _this.tstack.pop();
                if (first) {
                    first = false;
                }
                else {
                    map = ',' + map;
                }
                if (!isNaN(k)) {
                    k = "\"" + k + "\"";
                }
                map = k + ":" + v + map;
            }
            map = '{' + map;
            _this.tstack[p].push(map);
            _this.tstack[p] = "[" + _this.tstack[p].join(',') + "]";
            _this.writeToTransportIfStackIsFlushable();
        };
        this.writeListBegin = function (elemType, size) {
            _this.tpos.push(_this.tstack.length);
            _this.tstack.push([TJSONProtocol.Type[elemType], size]);
        };
        this.writeListEnd = function () {
            var p = _this.tpos.pop();
            while (_this.tstack.length > p + 1) {
                var tmpVal = _this.tstack[p + 1];
                _this.tstack.splice(p + 1, 1);
                _this.tstack[p].push(tmpVal);
            }
            _this.tstack[p] = "[" + _this.tstack[p].join(',') + "]";
            _this.writeToTransportIfStackIsFlushable();
        };
        this.writeSetBegin = function (elemType, size) {
            _this.tpos.push(_this.tstack.length);
            _this.tstack.push([TJSONProtocol.Type[elemType], size]);
        };
        this.writeSetEnd = function () {
            var p = _this.tpos.pop();
            while (_this.tstack.length > p + 1) {
                var tmpVal = _this.tstack[p + 1];
                _this.tstack.splice(p + 1, 1);
                _this.tstack[p].push(tmpVal);
            }
            _this.tstack[p] = "[" + _this.tstack[p].join(',') + "]";
            _this.writeToTransportIfStackIsFlushable();
        };
        this.writeBool = function (bool) {
            _this.tstack.push(bool ? 1 : 0);
        };
        this.writeByte = function (byte) {
            _this.tstack.push(byte);
        };
        this.writeI16 = function (i16) {
            _this.tstack.push(i16);
        };
        this.writeI32 = function (i32) {
            _this.tstack.push(i32);
        };
        this.writeI64 = function (i64) {
            _this.tstack.push(i64);
        };
        this.writeDouble = function (dub) {
            _this.tstack.push(dub);
        };
        this.writeString = function (arg) {
            if (arg === null) {
                _this.tstack.push(null);
            }
            else {
                var str = void 0;
                if (typeof arg === 'string') {
                    str = arg;
                }
                else if (arg instanceof __WEBPACK_IMPORTED_MODULE_1_buffer__["Buffer"]) {
                    str = arg.toString('utf8');
                }
                else {
                    throw new Error("writeString called without a string/Buffer argument: " + arg);
                }
                var escapedString = '';
                for (var i = 0; i < str.length; i++) {
                    var ch = str.charAt(i);
                    if (ch === '\"') {
                        escapedString += '\\\"';
                    }
                    else if (ch === '\\') {
                        escapedString += '\\\\';
                    }
                    else if (ch === '\b') {
                        escapedString += '\\b';
                    }
                    else if (ch === '\f') {
                        escapedString += '\\f';
                    }
                    else if (ch === '\n') {
                        escapedString += '\\n';
                    }
                    else if (ch === '\r') {
                        escapedString += '\\r';
                    }
                    else if (ch === '\t') {
                        escapedString += '\\t';
                    }
                    else {
                        escapedString += ch;
                    }
                }
                _this.tstack.push("\"" + escapedString + "\"");
            }
        };
        this.writeBinary = function (arg) {
            var buf;
            if (typeof arg === 'string') {
                buf = new __WEBPACK_IMPORTED_MODULE_1_buffer__["Buffer"](arg, 'binary');
            }
            else if (arg instanceof __WEBPACK_IMPORTED_MODULE_1_buffer__["Buffer"] || Object.prototype.toString.call(arg) === '[object Uint8Array]') {
                buf = arg;
            }
            else {
                throw new Error("writeBinary called without a string/Buffer argument: " + arg);
            }
            _this.tstack.push("\"" + buf.toString('base64') + "\"");
        };
        this.readMessageBegin = function () {
            _this.rstack = [];
            _this.rpos = [];
            var transBuf = _this.trans.borrow();
            if (transBuf.readIndex >= transBuf.writeIndex) {
                throw new __WEBPACK_IMPORTED_MODULE_2__error__["a" /* InputBufferUnderrunError */]();
            }
            var cursor = transBuf.readIndex;
            if (transBuf.buf[cursor] !== 0x5B) {
                throw new Error("Malformed JSON input, no opening bracket");
            }
            cursor++;
            var openBracketCount = 1;
            var inString = false;
            for (; cursor < transBuf.writeIndex; cursor++) {
                var chr = transBuf.buf[cursor];
                if (inString) {
                    if (chr === 0x22) {
                        inString = false;
                    }
                    else if (chr === 0x5C) {
                        cursor += 1;
                    }
                }
                else {
                    if (chr === 0x5B) {
                        openBracketCount += 1;
                    }
                    else if (chr === 0x5D) {
                        openBracketCount -= 1;
                        if (openBracketCount === 0) {
                            break;
                        }
                    }
                    else if (chr === 0x22) {
                        inString = true;
                    }
                }
            }
            if (openBracketCount !== 0) {
                throw new __WEBPACK_IMPORTED_MODULE_2__error__["a" /* InputBufferUnderrunError */]();
            }
            _this.robj = JSON.parse(transBuf.buf.slice(transBuf.readIndex, cursor + 1).toString());
            _this.trans.consume(cursor + 1 - transBuf.readIndex);
            var version = _this.robj.shift();
            if (version != TJSONProtocol.Version) {
                throw new Error('Wrong thrift protocol version: ' + version);
            }
            var r = {};
            r.fname = _this.robj.shift();
            r.mtype = _this.robj.shift();
            r.rseqid = _this.robj.shift();
            _this.rstack.push(_this.robj.shift());
            return r;
        };
        this.readMessageEnd = function () { };
        this.readStructBegin = function () {
            var r = {};
            r.fname = "";
            if (_this.rstack[_this.rstack.length - 1] instanceof Array) {
                _this.rstack.push(_this.rstack[_this.rstack.length - 1].shift());
            }
            return r;
        };
        this.readStructEnd = function () {
            _this.rstack.pop();
        };
        this.readFieldBegin = function () {
            var r = {};
            var fid = -1;
            var ftype = __WEBPACK_IMPORTED_MODULE_0__thrift_type__["c" /* ThriftType */].STOP;
            for (var f in (_this.rstack[_this.rstack.length - 1])) {
                if (f === null) {
                    continue;
                }
                fid = parseInt(f, 10);
                _this.rpos.push(_this.rstack.length);
                var field = _this.rstack[_this.rstack.length - 1][fid];
                delete _this.rstack[_this.rstack.length - 1][fid];
                _this.rstack.push(field);
                break;
            }
            if (fid != -1) {
                for (var i in (_this.rstack[_this.rstack.length - 1])) {
                    if (TJSONProtocol.RType[i] === null) {
                        continue;
                    }
                    ftype = TJSONProtocol.RType[i];
                    _this.rstack[_this.rstack.length - 1] = _this.rstack[_this.rstack.length - 1][i];
                }
            }
            r.fname = '';
            r.ftype = ftype;
            r.fid = fid;
            return r;
        };
        this.readFieldEnd = function () {
            var p = _this.rpos.pop();
            while (_this.rstack.length > p) {
                _this.rstack.pop();
            }
        };
        this.readMapBegin = function () {
            var map = _this.rstack.pop();
            var first = map.shift();
            if (first instanceof Array) {
                _this.rstack.push(map);
                map = first;
                first = map.shift();
            }
            var r = {};
            r.ktype = TJSONProtocol.RType[first];
            r.vtype = TJSONProtocol.RType[map.shift()];
            r.size = map.shift();
            _this.rpos.push(_this.rstack.length);
            _this.rstack.push(map.shift());
            return r;
        };
        this.readMapEnd = function () {
            _this.readFieldEnd();
        };
        this.readListBegin = function () {
            var list = _this.rstack[_this.rstack.length - 1];
            var r = {};
            r.etype = TJSONProtocol.RType[list.shift()];
            r.size = list.shift();
            _this.rpos.push(_this.rstack.length);
            _this.rstack.push(list.shift());
            return r;
        };
        this.readListEnd = function () {
            var p = _this.rpos.pop() - 2;
            var st = _this.rstack;
            st.pop();
            if (st instanceof Array && st.length > p && st[p].length > 0) {
                st.push(st[p].shift());
            }
        };
        this.readSetBegin = function () {
            return _this.readListBegin();
        };
        this.readSetEnd = function () {
            return _this.readListEnd();
        };
        this.readBool = function () {
            return _this.readValue() === "1";
        };
        this.readByte = function () {
            return _this.readI32();
        };
        this.readI16 = function () {
            return _this.readI32();
        };
        this.readI32 = function () {
            return +_this.readValue();
        };
        this.readValue = function (f) {
            if (f === undefined) {
                f = _this.rstack[_this.rstack.length - 1];
            }
            var r = {};
            if (f instanceof Array) {
                if (f.length === 0) {
                    r.value = undefined;
                }
                else {
                    r.value = f.shift();
                }
            }
            else if (f instanceof Object) {
                for (var i in f) {
                    if (i === null) {
                        continue;
                    }
                    _this.rstack.push(f[i]);
                    delete f[i];
                    r.value = i;
                    break;
                }
            }
            else {
                r.value = f;
                _this.rstack.pop();
            }
            return r.value;
        };
        this.readI64 = function () {
            return _this.readI32();
        };
        this.readDouble = function () {
            return _this.readI32();
        };
        this.readBinary = function () {
            return new __WEBPACK_IMPORTED_MODULE_1_buffer__["Buffer"](_this.readValue(), 'base64');
        };
        this.readString = function () {
            return _this.readValue();
        };
        this.getTransport = function () {
            return _this.trans;
        };
        this.skip = function (type) {
            var ret, i;
            switch (type) {
                case __WEBPACK_IMPORTED_MODULE_0__thrift_type__["c" /* ThriftType */].STOP:
                    return null;
                case __WEBPACK_IMPORTED_MODULE_0__thrift_type__["c" /* ThriftType */].BOOL:
                    return _this.readBool();
                case __WEBPACK_IMPORTED_MODULE_0__thrift_type__["c" /* ThriftType */].BYTE:
                    return _this.readByte();
                case __WEBPACK_IMPORTED_MODULE_0__thrift_type__["c" /* ThriftType */].I16:
                    return _this.readI16();
                case __WEBPACK_IMPORTED_MODULE_0__thrift_type__["c" /* ThriftType */].I32:
                    return _this.readI32();
                case __WEBPACK_IMPORTED_MODULE_0__thrift_type__["c" /* ThriftType */].I64:
                    return _this.readI64();
                case __WEBPACK_IMPORTED_MODULE_0__thrift_type__["c" /* ThriftType */].DOUBLE:
                    return _this.readDouble();
                case __WEBPACK_IMPORTED_MODULE_0__thrift_type__["c" /* ThriftType */].STRING:
                    return _this.readString();
                case __WEBPACK_IMPORTED_MODULE_0__thrift_type__["c" /* ThriftType */].STRUCT:
                    _this.readStructBegin();
                    while (true) {
                        ret = _this.readFieldBegin();
                        if (ret.ftype == __WEBPACK_IMPORTED_MODULE_0__thrift_type__["c" /* ThriftType */].STOP) {
                            break;
                        }
                        _this.skip(ret.ftype);
                        _this.readFieldEnd();
                    }
                    _this.readStructEnd();
                    return null;
                case __WEBPACK_IMPORTED_MODULE_0__thrift_type__["c" /* ThriftType */].MAP:
                    ret = _this.readMapBegin();
                    for (i = 0; i < ret.size; i++) {
                        if (i > 0) {
                            if (_this.rstack.length > _this.rpos[_this.rpos.length - 1] + 1) {
                                _this.rstack.pop();
                            }
                        }
                        _this.skip(ret.ktype);
                        _this.skip(ret.vtype);
                    }
                    _this.readMapEnd();
                    return null;
                case __WEBPACK_IMPORTED_MODULE_0__thrift_type__["c" /* ThriftType */].SET:
                    ret = _this.readSetBegin();
                    for (i = 0; i < ret.size; i++) {
                        _this.skip(ret.etype);
                    }
                    _this.readSetEnd();
                    return null;
                case __WEBPACK_IMPORTED_MODULE_0__thrift_type__["c" /* ThriftType */].LIST:
                    ret = _this.readListBegin();
                    for (i = 0; i < ret.size; i++) {
                        _this.skip(ret.etype);
                    }
                    _this.readListEnd();
                    return null;
            }
        };
        this.tstack = [];
        this.tpos = [];
        this.trans = trans;
    }
    TJSONProtocol.Type = (_a = {},
        _a[__WEBPACK_IMPORTED_MODULE_0__thrift_type__["c" /* ThriftType */].BOOL] = '"tf"',
        _a[__WEBPACK_IMPORTED_MODULE_0__thrift_type__["c" /* ThriftType */].BYTE] = '"i8"',
        _a[__WEBPACK_IMPORTED_MODULE_0__thrift_type__["c" /* ThriftType */].I16] = '"i16"',
        _a[__WEBPACK_IMPORTED_MODULE_0__thrift_type__["c" /* ThriftType */].I32] = '"i32"',
        _a[__WEBPACK_IMPORTED_MODULE_0__thrift_type__["c" /* ThriftType */].I64] = '"i64"',
        _a[__WEBPACK_IMPORTED_MODULE_0__thrift_type__["c" /* ThriftType */].DOUBLE] = '"dbl"',
        _a[__WEBPACK_IMPORTED_MODULE_0__thrift_type__["c" /* ThriftType */].STRUCT] = '"rec"',
        _a[__WEBPACK_IMPORTED_MODULE_0__thrift_type__["c" /* ThriftType */].STRING] = '"str"',
        _a[__WEBPACK_IMPORTED_MODULE_0__thrift_type__["c" /* ThriftType */].MAP] = '"map"',
        _a[__WEBPACK_IMPORTED_MODULE_0__thrift_type__["c" /* ThriftType */].LIST] = '"lst"',
        _a[__WEBPACK_IMPORTED_MODULE_0__thrift_type__["c" /* ThriftType */].SET] = '"set"',
        _a);
    TJSONProtocol.RType = {
        tf: __WEBPACK_IMPORTED_MODULE_0__thrift_type__["c" /* ThriftType */].BOOL,
        i8: __WEBPACK_IMPORTED_MODULE_0__thrift_type__["c" /* ThriftType */].BYTE,
        i16: __WEBPACK_IMPORTED_MODULE_0__thrift_type__["c" /* ThriftType */].I16,
        i32: __WEBPACK_IMPORTED_MODULE_0__thrift_type__["c" /* ThriftType */].I32,
        i64: __WEBPACK_IMPORTED_MODULE_0__thrift_type__["c" /* ThriftType */].I64,
        dbl: __WEBPACK_IMPORTED_MODULE_0__thrift_type__["c" /* ThriftType */].DOUBLE,
        rec: __WEBPACK_IMPORTED_MODULE_0__thrift_type__["c" /* ThriftType */].STRUCT,
        str: __WEBPACK_IMPORTED_MODULE_0__thrift_type__["c" /* ThriftType */].STRING,
        map: __WEBPACK_IMPORTED_MODULE_0__thrift_type__["c" /* ThriftType */].MAP,
        lst: __WEBPACK_IMPORTED_MODULE_0__thrift_type__["c" /* ThriftType */].LIST,
        set: __WEBPACK_IMPORTED_MODULE_0__thrift_type__["c" /* ThriftType */].SET
    };
    TJSONProtocol.Version = 1;
    return TJSONProtocol;
}());
/* harmony default export */ __webpack_exports__["a"] = (TJSONProtocol);
var _a;


/***/ }),

/***/ 54:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__transport_buffer__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__protocol_json__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__connection_ws__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__connection_xhr__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__create_client__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__thrift_type__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__error__ = __webpack_require__(21);







/* harmony default export */ __webpack_exports__["a"] = ({
    Protocol: __WEBPACK_IMPORTED_MODULE_1__protocol_json__["a" /* default */],
    TJSONProtocol: __WEBPACK_IMPORTED_MODULE_1__protocol_json__["a" /* default */],
    TBufferedTransport: __WEBPACK_IMPORTED_MODULE_0__transport_buffer__["a" /* default */],
    createWSConnection: __WEBPACK_IMPORTED_MODULE_2__connection_ws__["a" /* default */],
    createXHRConnection: __WEBPACK_IMPORTED_MODULE_3__connection_xhr__["a" /* default */],
    createClient: __WEBPACK_IMPORTED_MODULE_4__create_client__["a" /* default */],
    ThriftType: __WEBPACK_IMPORTED_MODULE_5__thrift_type__["c" /* ThriftType */],
    MessageType: __WEBPACK_IMPORTED_MODULE_5__thrift_type__["a" /* MessageType */],
    TApplicationExceptionType: __WEBPACK_IMPORTED_MODULE_5__thrift_type__["b" /* TApplicationExceptionType */],
    TApplicationException: __WEBPACK_IMPORTED_MODULE_6__error__["b" /* TApplicationException */],
    TException: __WEBPACK_IMPORTED_MODULE_6__error__["c" /* TException */]
});


/***/ }),

/***/ 55:
/***/ (function(module, exports) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}


/***/ }),

/***/ 93:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tutorialClient__ = __webpack_require__(94);

/* harmony default export */ __webpack_exports__["a"] = ({
    Calculator: __WEBPACK_IMPORTED_MODULE_0__tutorialClient__["a" /* CalculatorClient */]
});


/***/ }),

/***/ 94:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export INT32CONSTANT */
/* unused harmony export MAPCONSTANT */
/* unused harmony export Operation */
/* unused harmony export InvalidOperation */
/* unused harmony export Work */
/* unused harmony export Calculator_ping_args */
/* unused harmony export Calculator_ping_result */
/* unused harmony export Calculator_add_args */
/* unused harmony export Calculator_add_result */
/* unused harmony export Calculator_calculate_args */
/* unused harmony export Calculator_calculate_result */
/* unused harmony export Calculator_zip_args */
/* unused harmony export Calculator_zip_result */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CalculatorClient; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tmp__ = __webpack_require__(54);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var ThriftType = __WEBPACK_IMPORTED_MODULE_0__tmp__["a" /* default */].ThriftType, MessageType = __WEBPACK_IMPORTED_MODULE_0__tmp__["a" /* default */].MessageType, TApplicationException = __WEBPACK_IMPORTED_MODULE_0__tmp__["a" /* default */].TApplicationException, TException = __WEBPACK_IMPORTED_MODULE_0__tmp__["a" /* default */].TException;
var INT32CONSTANT = 9853;
var MAPCONSTANT = { "hello": "world", "goodnight": "moon" };
var Operation;
(function (Operation) {
    Operation[Operation["ADD"] = 1] = "ADD";
    Operation[Operation["SUBTRACT"] = 2] = "SUBTRACT";
    Operation[Operation["MULTIPLY"] = 3] = "MULTIPLY";
    Operation[Operation["DIVIDE"] = 4] = "DIVIDE";
})(Operation || (Operation = {}));
var InvalidOperation = (function (_super) {
    __extends(InvalidOperation, _super);
    function InvalidOperation(args) {
        var _this = _super.call(this) || this;
        _this.read = function (input) {
            input.readStructBegin();
            while (true) {
                var ret = input.readFieldBegin();
                var fname = ret.fname;
                var ftype = ret.ftype;
                var fid = ret.fid;
                if (ftype === ThriftType.STOP) {
                    break;
                }
                switch (fid) {
                    case 1:
                        if (ftype === ThriftType.I32) {
                            _this.whatOp = input.readI32();
                        }
                        else {
                            input.skip(ftype);
                        }
                        break;
                    case 2:
                        if (ftype === ThriftType.STRING) {
                            _this.why = input.readString();
                        }
                        else {
                            input.skip(ftype);
                        }
                        break;
                    default:
                        input.skip(ftype);
                }
                input.readFieldEnd();
            }
            input.readStructEnd();
            return;
        };
        _this.write = function (output) {
            output.writeStructBegin('InvalidOperation');
            if (_this.whatOp !== null && _this.whatOp !== undefined) {
                output.writeFieldBegin('whatOp', ThriftType.I32, 1);
                output.writeI32(_this.whatOp);
                output.writeFieldEnd();
            }
            if (_this.why !== null && _this.why !== undefined) {
                output.writeFieldBegin('why', ThriftType.STRING, 2);
                output.writeString(_this.why);
                output.writeFieldEnd();
            }
            output.writeFieldStop();
            output.writeStructEnd();
            return;
        };
        _this.name = "InvalidOperation";
        _this.whatOp = null;
        _this.why = "abc";
        if (args) {
            if (args.whatOp !== undefined && args.whatOp !== null) {
                _this.whatOp = args.whatOp;
            }
            if (args.why !== undefined && args.why !== null) {
                _this.why = args.why;
            }
        }
        return _this;
    }
    return InvalidOperation;
}(TException));

var Work = (function () {
    function Work(args) {
        var _this = this;
        this.read = function (input) {
            input.readStructBegin();
            while (true) {
                var ret = input.readFieldBegin();
                var fname = ret.fname;
                var ftype = ret.ftype;
                var fid = ret.fid;
                if (ftype === ThriftType.STOP) {
                    break;
                }
                switch (fid) {
                    case 1:
                        if (ftype === ThriftType.I32) {
                            _this.num1 = input.readI32();
                        }
                        else {
                            input.skip(ftype);
                        }
                        break;
                    case 2:
                        if (ftype === ThriftType.I32) {
                            _this.num2 = input.readI32();
                        }
                        else {
                            input.skip(ftype);
                        }
                        break;
                    case 3:
                        if (ftype === ThriftType.I32) {
                            _this.op = input.readI32();
                        }
                        else {
                            input.skip(ftype);
                        }
                        break;
                    case 4:
                        if (ftype === ThriftType.STRING) {
                            _this.comment = input.readString();
                        }
                        else {
                            input.skip(ftype);
                        }
                        break;
                    default:
                        input.skip(ftype);
                }
                input.readFieldEnd();
            }
            input.readStructEnd();
            return;
        };
        this.write = function (output) {
            output.writeStructBegin('Work');
            if (_this.num1 !== null && _this.num1 !== undefined) {
                output.writeFieldBegin('num1', ThriftType.I32, 1);
                output.writeI32(_this.num1);
                output.writeFieldEnd();
            }
            if (_this.num2 !== null && _this.num2 !== undefined) {
                output.writeFieldBegin('num2', ThriftType.I32, 2);
                output.writeI32(_this.num2);
                output.writeFieldEnd();
            }
            if (_this.op !== null && _this.op !== undefined) {
                output.writeFieldBegin('op', ThriftType.I32, 3);
                output.writeI32(_this.op);
                output.writeFieldEnd();
            }
            if (_this.comment !== null && _this.comment !== undefined) {
                output.writeFieldBegin('comment', ThriftType.STRING, 4);
                output.writeString(_this.comment);
                output.writeFieldEnd();
            }
            output.writeFieldStop();
            output.writeStructEnd();
            return;
        };
        this.name = "Work";
        this.num1 = 0;
        this.num2 = null;
        this.op = null;
        this.comment = null;
        if (args) {
            if (args.num1 !== undefined && args.num1 !== null) {
                this.num1 = args.num1;
            }
            if (args.num2 !== undefined && args.num2 !== null) {
                this.num2 = args.num2;
            }
            if (args.op !== undefined && args.op !== null) {
                this.op = args.op;
            }
            if (args.comment !== undefined && args.comment !== null) {
                this.comment = args.comment;
            }
        }
    }
    return Work;
}());

var Calculator_ping_args = (function () {
    function Calculator_ping_args(args) {
        this.read = function (input) {
            input.readStructBegin();
            while (true) {
                var ret = input.readFieldBegin();
                var fname = ret.fname;
                var ftype = ret.ftype;
                var fid = ret.fid;
                if (ftype === ThriftType.STOP) {
                    break;
                }
                input.skip(ftype);
                input.readFieldEnd();
            }
            input.readStructEnd();
            return;
        };
        this.write = function (output) {
            output.writeStructBegin('Calculator_ping_args');
            output.writeFieldStop();
            output.writeStructEnd();
            return;
        };
        this.name = "Calculator_ping_args";
    }
    return Calculator_ping_args;
}());

var Calculator_ping_result = (function () {
    function Calculator_ping_result(args) {
        var _this = this;
        this.read = function (input) {
            input.readStructBegin();
            while (true) {
                var ret = input.readFieldBegin();
                var fname = ret.fname;
                var ftype = ret.ftype;
                var fid = ret.fid;
                if (ftype === ThriftType.STOP) {
                    break;
                }
                switch (fid) {
                    case 0:
                        if (ftype === ThriftType.STRING) {
                            _this.success = input.readString();
                        }
                        else {
                            input.skip(ftype);
                        }
                        break;
                    default:
                        input.skip(ftype);
                }
                input.readFieldEnd();
            }
            input.readStructEnd();
            return;
        };
        this.write = function (output) {
            output.writeStructBegin('Calculator_ping_result');
            if (_this.success !== null && _this.success !== undefined) {
                output.writeFieldBegin('success', ThriftType.STRING, 0);
                output.writeString(_this.success);
                output.writeFieldEnd();
            }
            output.writeFieldStop();
            output.writeStructEnd();
            return;
        };
        this.name = "Calculator_ping_result";
        this.success = null;
        if (args) {
            if (args.success !== undefined && args.success !== null) {
                this.success = args.success;
            }
        }
    }
    return Calculator_ping_result;
}());

var Calculator_add_args = (function () {
    function Calculator_add_args(args) {
        var _this = this;
        this.read = function (input) {
            input.readStructBegin();
            while (true) {
                var ret = input.readFieldBegin();
                var fname = ret.fname;
                var ftype = ret.ftype;
                var fid = ret.fid;
                if (ftype === ThriftType.STOP) {
                    break;
                }
                switch (fid) {
                    case 1:
                        if (ftype === ThriftType.I32) {
                            _this.num1 = input.readI32();
                        }
                        else {
                            input.skip(ftype);
                        }
                        break;
                    case 2:
                        if (ftype === ThriftType.I32) {
                            _this.num2 = input.readI32();
                        }
                        else {
                            input.skip(ftype);
                        }
                        break;
                    default:
                        input.skip(ftype);
                }
                input.readFieldEnd();
            }
            input.readStructEnd();
            return;
        };
        this.write = function (output) {
            output.writeStructBegin('Calculator_add_args');
            if (_this.num1 !== null && _this.num1 !== undefined) {
                output.writeFieldBegin('num1', ThriftType.I32, 1);
                output.writeI32(_this.num1);
                output.writeFieldEnd();
            }
            if (_this.num2 !== null && _this.num2 !== undefined) {
                output.writeFieldBegin('num2', ThriftType.I32, 2);
                output.writeI32(_this.num2);
                output.writeFieldEnd();
            }
            output.writeFieldStop();
            output.writeStructEnd();
            return;
        };
        this.name = "Calculator_add_args";
        this.num1 = null;
        this.num2 = null;
        if (args) {
            if (args.num1 !== undefined && args.num1 !== null) {
                this.num1 = args.num1;
            }
            if (args.num2 !== undefined && args.num2 !== null) {
                this.num2 = args.num2;
            }
        }
    }
    return Calculator_add_args;
}());

var Calculator_add_result = (function () {
    function Calculator_add_result(args) {
        var _this = this;
        this.read = function (input) {
            input.readStructBegin();
            while (true) {
                var ret = input.readFieldBegin();
                var fname = ret.fname;
                var ftype = ret.ftype;
                var fid = ret.fid;
                if (ftype === ThriftType.STOP) {
                    break;
                }
                switch (fid) {
                    case 0:
                        if (ftype === ThriftType.I32) {
                            _this.success = input.readI32();
                        }
                        else {
                            input.skip(ftype);
                        }
                        break;
                    default:
                        input.skip(ftype);
                }
                input.readFieldEnd();
            }
            input.readStructEnd();
            return;
        };
        this.write = function (output) {
            output.writeStructBegin('Calculator_add_result');
            if (_this.success !== null && _this.success !== undefined) {
                output.writeFieldBegin('success', ThriftType.I32, 0);
                output.writeI32(_this.success);
                output.writeFieldEnd();
            }
            output.writeFieldStop();
            output.writeStructEnd();
            return;
        };
        this.name = "Calculator_add_result";
        this.success = null;
        if (args) {
            if (args.success !== undefined && args.success !== null) {
                this.success = args.success;
            }
        }
    }
    return Calculator_add_result;
}());

var Calculator_calculate_args = (function () {
    function Calculator_calculate_args(args) {
        var _this = this;
        this.read = function (input) {
            input.readStructBegin();
            while (true) {
                var ret = input.readFieldBegin();
                var fname = ret.fname;
                var ftype = ret.ftype;
                var fid = ret.fid;
                if (ftype === ThriftType.STOP) {
                    break;
                }
                switch (fid) {
                    case 1:
                        if (ftype === ThriftType.I32) {
                            _this.logid = input.readI32();
                        }
                        else {
                            input.skip(ftype);
                        }
                        break;
                    case 2:
                        if (ftype === ThriftType.STRUCT) {
                            _this.w = new Work();
                            _this.w.read(input);
                        }
                        else {
                            input.skip(ftype);
                        }
                        break;
                    default:
                        input.skip(ftype);
                }
                input.readFieldEnd();
            }
            input.readStructEnd();
            return;
        };
        this.write = function (output) {
            output.writeStructBegin('Calculator_calculate_args');
            if (_this.logid !== null && _this.logid !== undefined) {
                output.writeFieldBegin('logid', ThriftType.I32, 1);
                output.writeI32(_this.logid);
                output.writeFieldEnd();
            }
            if (_this.w !== null && _this.w !== undefined) {
                output.writeFieldBegin('w', ThriftType.STRUCT, 2);
                _this.w.write(output);
                output.writeFieldEnd();
            }
            output.writeFieldStop();
            output.writeStructEnd();
            return;
        };
        this.name = "Calculator_calculate_args";
        this.logid = null;
        this.w = null;
        if (args) {
            if (args.logid !== undefined && args.logid !== null) {
                this.logid = args.logid;
            }
            if (args.w !== undefined && args.w !== null) {
                this.w = new Work(args.w);
            }
        }
    }
    return Calculator_calculate_args;
}());

var Calculator_calculate_result = (function () {
    function Calculator_calculate_result(args) {
        var _this = this;
        this.read = function (input) {
            input.readStructBegin();
            while (true) {
                var ret = input.readFieldBegin();
                var fname = ret.fname;
                var ftype = ret.ftype;
                var fid = ret.fid;
                if (ftype === ThriftType.STOP) {
                    break;
                }
                switch (fid) {
                    case 0:
                        if (ftype === ThriftType.I32) {
                            _this.success = input.readI32();
                        }
                        else {
                            input.skip(ftype);
                        }
                        break;
                    case 1:
                        if (ftype === ThriftType.STRUCT) {
                            _this.ouch = new InvalidOperation();
                            _this.ouch.read(input);
                        }
                        else {
                            input.skip(ftype);
                        }
                        break;
                    default:
                        input.skip(ftype);
                }
                input.readFieldEnd();
            }
            input.readStructEnd();
            return;
        };
        this.write = function (output) {
            output.writeStructBegin('Calculator_calculate_result');
            if (_this.success !== null && _this.success !== undefined) {
                output.writeFieldBegin('success', ThriftType.I32, 0);
                output.writeI32(_this.success);
                output.writeFieldEnd();
            }
            if (_this.ouch !== null && _this.ouch !== undefined) {
                output.writeFieldBegin('ouch', ThriftType.STRUCT, 1);
                _this.ouch.write(output);
                output.writeFieldEnd();
            }
            output.writeFieldStop();
            output.writeStructEnd();
            return;
        };
        this.name = "Calculator_calculate_result";
        this.success = null;
        this.ouch = null;
        if (args instanceof InvalidOperation) {
            this.ouch = args;
            return;
        }
        if (args) {
            if (args.success !== undefined && args.success !== null) {
                this.success = args.success;
            }
            if (args.ouch !== undefined && args.ouch !== null) {
                this.ouch = args.ouch;
            }
        }
    }
    return Calculator_calculate_result;
}());

var Calculator_zip_args = (function () {
    function Calculator_zip_args(args) {
        this.read = function (input) {
            input.readStructBegin();
            while (true) {
                var ret = input.readFieldBegin();
                var fname = ret.fname;
                var ftype = ret.ftype;
                var fid = ret.fid;
                if (ftype === ThriftType.STOP) {
                    break;
                }
                input.skip(ftype);
                input.readFieldEnd();
            }
            input.readStructEnd();
            return;
        };
        this.write = function (output) {
            output.writeStructBegin('Calculator_zip_args');
            output.writeFieldStop();
            output.writeStructEnd();
            return;
        };
        this.name = "Calculator_zip_args";
    }
    return Calculator_zip_args;
}());

var Calculator_zip_result = (function () {
    function Calculator_zip_result(args) {
        this.read = function (input) {
            input.readStructBegin();
            while (true) {
                var ret = input.readFieldBegin();
                var fname = ret.fname;
                var ftype = ret.ftype;
                var fid = ret.fid;
                if (ftype === ThriftType.STOP) {
                    break;
                }
                input.skip(ftype);
                input.readFieldEnd();
            }
            input.readStructEnd();
            return;
        };
        this.write = function (output) {
            output.writeStructBegin('Calculator_zip_result');
            output.writeFieldStop();
            output.writeStructEnd();
            return;
        };
        this.name = "Calculator_zip_result";
    }
    return Calculator_zip_result;
}());

var CalculatorClient = (function () {
    function CalculatorClient(output, pClass) {
        var _this = this;
        this.ping = function (callback) {
            if (callback === undefined) {
                var self_1 = _this;
                return new Promise(function (resolve, reject) {
                    self_1.reqs[self_1.id] = function (err, result) {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve(result);
                        }
                    };
                    self_1.send_ping();
                });
            }
            else {
                _this.reqs[_this.id] = callback;
                _this.send_ping();
            }
        };
        this.send_ping = function () {
            var output = new _this.pClass(_this.output);
            output.writeMessageBegin('ping', MessageType.CALL, _this.id);
            var args = new Calculator_ping_args({});
            args.write(output);
            output.writeMessageEnd();
            return _this.output.flush();
        };
        this.recv_ping = function (input, mtype, rseqid) {
            var callback = _this.reqs[rseqid] || function () { };
            delete _this.reqs[rseqid];
            if (mtype === MessageType.EXCEPTION) {
                var x = new TApplicationException();
                x.read(input);
                input.readMessageEnd();
                return callback(x);
            }
            var result = new Calculator_ping_result();
            result.read(input);
            input.readMessageEnd();
            if (null !== result.success) {
                return callback(null, result.success);
            }
            return callback('ping failed: unknown result');
        };
        this.add = function (num1, num2, callback) {
            if (callback === undefined) {
                var self_2 = _this;
                return new Promise(function (resolve, reject) {
                    self_2.reqs[self_2.id] = function (err, result) {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve(result);
                        }
                    };
                    self_2.send_add(num1, num2);
                });
            }
            else {
                _this.reqs[_this.id] = callback;
                _this.send_add(num1, num2);
            }
        };
        this.send_add = function (num1, num2) {
            var output = new _this.pClass(_this.output);
            output.writeMessageBegin('add', MessageType.CALL, _this.id);
            var args = new Calculator_add_args({ num1: num1, num2: num2 });
            args.write(output);
            output.writeMessageEnd();
            return _this.output.flush();
        };
        this.recv_add = function (input, mtype, rseqid) {
            var callback = _this.reqs[rseqid] || function () { };
            delete _this.reqs[rseqid];
            if (mtype === MessageType.EXCEPTION) {
                var x = new TApplicationException();
                x.read(input);
                input.readMessageEnd();
                return callback(x);
            }
            var result = new Calculator_add_result();
            result.read(input);
            input.readMessageEnd();
            if (null !== result.success) {
                return callback(null, result.success);
            }
            return callback('add failed: unknown result');
        };
        this.calculate = function (logid, w, callback) {
            if (callback === undefined) {
                var self_3 = _this;
                return new Promise(function (resolve, reject) {
                    self_3.reqs[self_3.id] = function (err, result) {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve(result);
                        }
                    };
                    self_3.send_calculate(logid, w);
                });
            }
            else {
                _this.reqs[_this.id] = callback;
                _this.send_calculate(logid, w);
            }
        };
        this.send_calculate = function (logid, w) {
            var output = new _this.pClass(_this.output);
            output.writeMessageBegin('calculate', MessageType.CALL, _this.id);
            var args = new Calculator_calculate_args({ logid: logid, w: w });
            args.write(output);
            output.writeMessageEnd();
            return _this.output.flush();
        };
        this.recv_calculate = function (input, mtype, rseqid) {
            var callback = _this.reqs[rseqid] || function () { };
            delete _this.reqs[rseqid];
            if (mtype === MessageType.EXCEPTION) {
                var x = new TApplicationException();
                x.read(input);
                input.readMessageEnd();
                return callback(x);
            }
            var result = new Calculator_calculate_result();
            result.read(input);
            input.readMessageEnd();
            if (null !== result.ouch) {
                throw result.ouch;
            }
            if (null !== result.success) {
                return callback(null, result.success);
            }
            return callback('calculate failed: unknown result');
        };
        this.zip = function (callback) {
            if (callback === undefined) {
                var self_4 = _this;
                return new Promise(function (resolve, reject) {
                    self_4.reqs[self_4.id] = function (err, result) {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve(result);
                        }
                    };
                    self_4.send_zip();
                });
            }
            else {
                _this.reqs[_this.id] = callback;
                _this.send_zip();
            }
        };
        this.send_zip = function () {
            var output = new _this.pClass(_this.output);
            output.writeMessageBegin('zip', MessageType.CALL, _this.id);
            var args = new Calculator_zip_args({});
            args.write(output);
            output.writeMessageEnd();
            return _this.output.flush();
        };
        this.output = output;
        this.pClass = pClass;
        this.id = 0;
        this.reqs = {};
    }
    return CalculatorClient;
}());

/* unused harmony default export */ var _unused_webpack_default_export = ({
    CalculatorClient: CalculatorClient
});


/***/ }),

/***/ 95:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function placeHoldersCount (b64) {
  var len = b64.length
  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
}

function byteLength (b64) {
  // base64 is 4/3 + up to two characters of the original data
  return (b64.length * 3 / 4) - placeHoldersCount(b64)
}

function toByteArray (b64) {
  var i, l, tmp, placeHolders, arr
  var len = b64.length
  placeHolders = placeHoldersCount(b64)

  arr = new Arr((len * 3 / 4) - placeHolders)

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len

  var L = 0

  for (i = 0; i < l; i += 4) {
    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
    arr[L++] = (tmp >> 16) & 0xFF
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  if (placeHolders === 2) {
    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[L++] = tmp & 0xFF
  } else if (placeHolders === 1) {
    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var output = ''
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    output += lookup[tmp >> 2]
    output += lookup[(tmp << 4) & 0x3F]
    output += '=='
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
    output += lookup[tmp >> 10]
    output += lookup[(tmp >> 4) & 0x3F]
    output += lookup[(tmp << 2) & 0x3F]
    output += '='
  }

  parts.push(output)

  return parts.join('')
}


/***/ }),

/***/ 96:
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),

/***/ 97:
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),

/***/ 98:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = __webpack_require__(100);

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = __webpack_require__(101);

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(34), __webpack_require__(99)))

/***/ }),

/***/ 99:
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ })

/******/ });