import WebSocket, { WebSocketServer } from "ws";
import {
  mouse,
  left,
  right,
  up,
  down,
  straightTo,
  screen,
  Image,
  imageResource,
} from "@nut-tree/nut-js";
import COMMANDS from "../constants/commands";
import { drawCircle, drawRectangle } from "../drawing/drawing";
import { moveDown, moveLeft, moveRight, moveUp } from "../navigation/navigation";

// Creating connection using websocket

const onConnectWS = async (ws: WebSocket) => {
  console.log("new client connected");
  // sending message

  ws.on("message", async (data) => {
    ws.send(data.toString());
    console.log(JSON.stringify(data));
    console.log(`Client has sent us: ${data.toString("utf8")}`);

    const [command, _width, _length] = data.toString().split(" ");

    const width = Number(_width);
    const length = Number(_length);
    if (command === COMMANDS.PRNT) {
      let i;
      //    const img = await screen.capture("./").then((im) => ws.send(im));
    }

    if (command === COMMANDS.UP) {
      await moveUp(width)
    }
    if (command === COMMANDS.DOWN) {
      await moveDown(width)
    }
    if (command === COMMANDS.LEFT) {
      await moveLeft(width)
    }
    if (command === COMMANDS.RIGHT) {
      await moveRight(width)
    }
    if (command === COMMANDS.SQUARE) {
      await drawRectangle(width, width);
    }
    if (command === COMMANDS.REC) {
      await drawRectangle(width, length);
    }
    if (command === COMMANDS.CIRCLE) {
      await drawCircle(width);
    }
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
