import { httpServer } from "./src/http_server/index";
import { mouse, left, right, up, down, straightTo } from "@nut-tree/nut-js";
import { WebSocketServer } from "ws";
import onConnectWS from "./src/web_socket_server/index";
const HTTP_PORT = 8181;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

// Importing the required modules

// Creating a new websocket server
const wss = new WebSocketServer({ port: 8080 });
wss.on("connection", onConnectWS);

// const myWs = new WebSocket('ws://localhost:9000');
