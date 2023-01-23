import { httpServer } from "./http_server/index";
import process from "node:process";
import { WebSocketServer } from "ws";
import onConnectWS from "./web_socket_server/index";

const httpPort = +(process.env.HTTP_PORT || 8181);
const webSocketPort = +(process.env.WEB_SOCKET_PORT || 8080);

console.log(`Start static http server on the ${httpPort} port!`);
httpServer.listen(httpPort);

const wss = new WebSocketServer({ port: webSocketPort });
wss.on("connection", onConnectWS);
