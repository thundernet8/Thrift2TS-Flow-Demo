var thrift = require("thrift");
var Calculator = require("./gen-nodejs/Calculator");
var ttypes = require("./gen-nodejs/tutorial_types");

var httpServer = thrift.createWebServer({
    cors: { '*': true },
    services: {
        '/thrift/rpc': {
            transport: thrift.TBufferedTransport,
            protocol: thrift.TJSONProtocol,
            processor: Calculator,
            handler: {
                ping: function (result) {
                    console.log("ping()");
                    result(null, 'pong');
                },

                add: function (n1, n2, result) {
                    console.log("add(", n1, ",", n2, ")");
                    result(null, n1 + n2);
                },

                calculate: function (logid, work, result) {
                    console.log("calculate(", logid, ",", work, ")");

                    var val = 0;
                    if (work.op == ttypes.Operation.ADD) {
                        val = work.num1 + work.num2;
                    } else if (work.op === ttypes.Operation.SUBTRACT) {
                        val = work.num1 - work.num2;
                    } else if (work.op === ttypes.Operation.MULTIPLY) {
                        val = work.num1 * work.num2;
                    } else if (work.op === ttypes.Operation.DIVIDE) {
                        if (work.num2 === 0) {
                            var x = new ttypes.InvalidOperation();
                            x.whatOp = work.op;
                            x.why = 'Cannot divide by 0';
                            result(x);
                            return;
                        }
                        val = work.num1 / work.num2;
                    } else {
                        var x = new ttypes.InvalidOperation();
                        x.whatOp = work.op;
                        x.why = 'Invalid operation';
                        result(x);
                        return;
                    }

                    result(null, val);
                },

                zip: function () {
                    console.log("zip()");
                    result(null);
                }
            }
        }
    }
});

httpServer.on('error', function (err) {
    console.log(err);
});

httpServer.listen(9090);
console.log('RPC server started... port: 9090');