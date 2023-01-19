import WebSocket, { WebSocketServer } from "ws";
import { handleWsData } from "./entities";

// Creating connection using websocket

const onConnectWS = async (ws: WebSocket) => {
  console.log("new client connected");
  // sending message

  ws.on("message", async (data) => {
    ws.send(data.toString());
    console.log(JSON.stringify(data));
    console.log(`Client has sent us: ${data.toString("utf8")}`);
    handleWsData(data)

 

    
  });
  // handling what to do when clients disconnects from server
  ws.on("close", () => {
    console.log("the client has connected");
  });
  // handling client connection error
  ws.onerror = function () {
    console.log("Some Error occurred");
  };
};

export default onConnectWS;
