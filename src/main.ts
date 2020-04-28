import { Canvas } from "./canvas";
import { Texture } from "./texture";

const canvas = new Canvas("world", 600, 400);
const image = new Texture("./assets/cat.jpg");

const imageLoad = () => {
  if (image.isLoaded) {
    canvas.draw(image, 10, 10);
    return;
  }
  setTimeout(imageLoad, 100);
}
setTimeout(imageLoad, 100);
