import { Texture } from "./Texture";

export class Canvas {
  protected domElement: HTMLCanvasElement;
  protected _context: CanvasRenderingContext2D | null;

  constructor(query: string, public width: number = 100, public height: number = 100) {
    if (query != "") {
      this.domElement = <HTMLCanvasElement>document.getElementById(query);
    } else {
      this.domElement = <HTMLCanvasElement>document.createElement("canvas");
      document.appendChild(this.domElement);
    }
    this.domElement.width = width;
    this.domElement.height = height;

    this._context = this.domElement.getContext("2d");
  }

  draw(texture: Texture, sx: number, sy: number, sw: number, sh: number, dx: number, dy: number, dw: number, dh: number) {
    this._context?.drawImage(texture.image, sx, sy, sw, sh, dx, dy, dw, dh);
  }

  clear(): this {
    this._context?.clearRect(0, 0, this.domElement.width, this.domElement.height);
    return this;
  }

  drawLine(sx: number, sy: number, ex: number, ey: number, color: string = "black", width: number = 1): this {
    const context = this._context;
    context.beginPath();
    context.moveTo(sx, sy);
    context.lineTo(ex, ey);
    context.strokeStyle = color;
    context.lineWidth = width;
    context.stroke();
    return this;
  }

  get canvas(): HTMLCanvasElement {
    return this.domElement;
  }

  get context(): CanvasRenderingContext2D {
    return this._context;
  }

}

