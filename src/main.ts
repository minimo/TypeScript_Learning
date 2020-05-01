import { Application } from './Application';
import { Canvas } from "./Canvas";
import { Sprite } from "./Sprite";

const canvas = new Canvas("world", 600, 400);
const sprite = new Sprite("./assets/neko.png", 32, 32);

let flick: number = 0;
let time: number = 1;
const mainLoop = () => {
  if (time % 10 == 0) {
    sprite.setFrameIndex(4 + flick);
    flick = (flick + 1) % 2;
  }
  canvas.clear();
  sprite.draw(canvas, 10, 10);
  time++;
  setTimeout(mainLoop, 33);
}
setTimeout(mainLoop, 33);
