import { Canvas } from "./canvas";
import { Texture } from "./texture";

export class Application {
  private canvas: Canvas;
  constructor(query: string, public width: number = 640, public height: number = 480) {
  }
}

