import WebSocket, { WebSocketServer } from "ws";
import { handleWsData } from "./entities";
import { Region, screen } from "@nut-tree/nut-js";
import COMMANDS from "../constants/commands";
// Creating connection using websocket

const onConnectWS = async (ws: WebSocket) => {
  console.log("new client connected");
  // sending message

  ws.on("message", async (data, isBinary) => {
  //  ws.send("prt");

    //  console.log(JSON.stringify(data));
    console.log(`Client has sent us: ${data.toString("utf8")}`);

    handleWsData(data, ws);
  });
  ws.on("upgrade", (response) => {
    console.log({ response });
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
