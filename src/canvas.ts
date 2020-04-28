import { Texture } from "./texture";

export class Canvas {
  private domElement: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;

  constructor(query: string, public width: number = 100, public height: number = 100) {
    this.domElement = <HTMLCanvasElement>document.getElementById(query);
    this.domElement.width = width;
    this.domElement.height = height;

    this.context = this.domElement.getContext("2d");
  }

  draw(texture: Texture, x: number = 0, y: number = 0) {
    this.context.drawImage(texture.image, x, y);
  }

}

