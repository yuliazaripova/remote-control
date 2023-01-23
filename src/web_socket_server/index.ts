import WebSocket, { WebSocketServer } from "ws";
import { handleWsData } from "./entities";

const webSocketPort = +(process.env.WEB_SOCKET_PORT || 8080);
const onConnectWS = async (ws: WebSocket) => {
  console.log(`Websocket server on the ws://localhost:${webSocketPort}/`);

  ws.on("message", async (data) => {
    handleWsData(data, ws);
  });

  ws.on("upgrade", (response) => {
    console.log({ response });
  });

  ws.on("close", () => {
    console.log("WS connection closed");
  });

  ws.onerror = function () {
    console.log("Some Error occurred");
  };

  process.on("SIGINT", () => ws.close());
};

export default onConnectWS;
