import { Canvas } from "./Canvas";
import { Texture } from "./Texture";

export class Application {
  private canvas: Canvas;
  constructor(query: string, public width: number = 640, public height: number = 480) {
  }
}

