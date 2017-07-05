import clients from '../RPC-client2/clients'

import ThriftBrowser from 'browser-thrift2'
const { TJSONProtocol,
    TBufferedTransport,
    createWSConnection,
    createXHRConnection,
    createClient
} = ThriftBrowser

/**
 * Please replace the host, port, and other options for connecting RPC server
 */

// this demo is using XHR
const host = "localhost"
const port = 9090
let createConnectionForService = (serviceName: string) => {
    let conn = createXHRConnection(host, port, {
        path: "/rpc/" + serviceName
    })

    conn.on("error", err => {
        console.dir(err)
    })

    return conn
}

export default function thriftRPC<T>(method, params): Promise<T> {
    let splits: string[] = method.split('.').filter(x => x !== "")
    if (splits.length < 2) {
        throw new Error("Invalid RPC method, the correct format is `ServiceName.MethodName`")
    }
	let service = splits[0];
    let func = splits[1];

    let client = createClient(clients[service], createConnectionForService(service))
    return new Promise((resolve, reject) => {
        try {
            client[func](...Object.keys(params).map(key => params[key]), (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            });
        } catch (e) {
            reject(e)
        }
    })
}
