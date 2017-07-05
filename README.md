## Thrift2TS-Flow-Demo
This is a demo using [thrift2ts](https://www.npmjs.com/package/thrift2ts) as thrift clients generation tool, and [Browser-Thrift](https://www.npmjs.com/package/browser-thrift2) for data transport protocol when communicate with a thrift RPC server.

## Steps

#### Write thrift

We have a tutorial.thrift file under the root of this package now

#### Generate RPC clients and typescript interfaces for app refer

```
yarn global add thrift2ts
```

or

```
npm install thrift2ts -g
```

now run cli

```
t2t -i tutorial.thrift -o RPC-client1 -c -r ../RequestSample/request1
```

again for another copy code

```
t2t -i tutorial.thrift -o RPC-client2 -c -r ../RequestSample/request2
```

request1 file is using WebSocket, request2 file is using XHR.

build scripts for demo page

```
npm run build
```

#### Run RPC Server

```
npm run server
```

#### Run Demo Web Page

```
npm run page
```

Visit localhost:8080 and follow the directions, check Chrome Dev Tool network tab to find more information.