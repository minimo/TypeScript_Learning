import { Texture } from "./texture";

export class Canvas {
  private domElement: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;

  constructor(query: string, public width: number = 100, public height: number = 100) {
    if (query != "") {
      this.domElement = <HTMLCanvasElement>document.getElementById(query);
    } else {
      this.domElement = <HTMLCanvasElement>document.createElement("canvas");
      document.appendChild(this.domElement);
    }
    this.domElement.width = width;
    this.domElement.height = height;

    this.context = this.domElement.getContext("2d");
  }

  draw(texture: Texture, sx: number, sy: number, sw: number, sh: number, dx: number, dy: number, dw: number, dh: number) {
    this.context.drawImage(texture.image, sx, sy, sw, sh, dx, dy, dw, dh);
  }

  clear(): void {
    this.context.clearRect(0, 0, this.domElement.width, this.domElement.height);
  }

}

