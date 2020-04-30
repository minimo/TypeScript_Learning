import { Canvas } from "./canvas";
import { Texture } from "./texture";

export class Sprite {
  private texture: Texture;
  private _frameIndex: number;
  private srcRect: {x: number, y: number, width: number, height: number };

  constructor(public path: string, private _width: number, private _height: number) {
    this._frameIndex = 0;
    this.texture = new Texture(path);
    this.srcRect = { x: 0, y: 0, width: 0, height: 0 };
  }

  draw(canvas: Canvas, dx: number, dy: number): this {
    if (!this.texture.isLoaded) return this;
    this.setFrameIndex(this._frameIndex);
    const sx = this.srcRect.x;
    const sy = this.srcRect.y;
    const sw = this.srcRect.width;
    const sh = this.srcRect.height;
    canvas.draw(this.texture, sx, sy, sw, sh, dx, dy, sw, sh);
    return this;
  }

  setFrameIndex(index: number): this {
    const image = this.texture.image;

    const tw = this._width;
    const th = this._height;

    const row = ~~(image.width / tw);
    const col = ~~(image.height / th);
    const maxIndex = row * col;
    const _index = index % maxIndex;
    
    const x = _index % row;
    const y = ~~(_index/row);

    this.srcRect.x = x * tw;
    this.srcRect.y = y * th;
    this.srcRect.width  = tw;
    this.srcRect.height = th;

    this._frameIndex = index;
    return this;
  }
  
}

