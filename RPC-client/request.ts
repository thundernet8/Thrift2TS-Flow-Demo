import clients from './clients'

import ThriftBrowser from '../tmp'
const { TJSONProtocol,
    TBufferedTransport,
    createWSConnection,
    createXHRConnection,
    createClient
} = ThriftBrowser

/**
 * Please replace the host, port, and other options for connecting RPC server
 */

// this demo is using WebSocket

let conns = {} // save connection instance for same service and reuse
const host = "localhost"
const port = 9090
let createConnectionForService = (serviceName: string) => {
    let conn
    if (conns[serviceName] !== undefined) {
        conn = conns[serviceName]
    } else {
        conn = createWSConnection(host, port, {
            path: "/rpc/" + serviceName
        })
        conns[serviceName] = conn

        // listen
        conn.on("open", err => {
            console.log("WebSockert connected to: ", conn.uri())
        })

        conn.on("error", err => {
            console.dir(err)
        })
    }

    if (!conn.isOpen()) {
        conn.open()
    }

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
