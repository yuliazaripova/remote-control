import { Region } from "@nut-tree/nut-js";
import Jimp from "jimp";
import { screen } from "@nut-tree/nut-js";
import { getMousePosition } from "../navigation/navigation";
import COMMANDS, { PRNT_WIDTH, PRNT_HEIGHT } from "../constants/commands";

export const getPrintScreen = async () => {
  const { x, y } = await getMousePosition();
  const region = new Region(x, y, PRNT_WIDTH, PRNT_HEIGHT);
  const image = await screen.grabRegion(region);
  const rgbImage = await image.toRGB();
  const jimpImage = new Jimp(rgbImage);
  const res = await Jimp.read(jimpImage);
  console.log({
    command: COMMANDS.PRNT,
    result: image.data,
  });
  return await res.getBase64Async(Jimp.MIME_PNG);
};

export const prepareBase64 = (img: string) => {
  return img.replace(/^data:image\/png;base64,/, "");
};
