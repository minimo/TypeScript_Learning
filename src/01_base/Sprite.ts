import { Canvas } from "./Canvas";
import { Texture } from "./Texture";
import { Object2D } from "./Object2D";

export class Sprite extends Object2D {
  protected texture: Texture;
  protected _frameIndex: number;
  protected srcRect: { x: number, y: number, width: number, height: number };

  constructor(path: string, width: number, height: number) {
    super(width, height);

    this._frameIndex = 0;
    this.texture = new Texture(path);
    this.srcRect = { x: 0, y: 0, width: 0, height: 0 };
  }

  draw(canvas: Canvas): this {
    return this._draw(canvas, this.x, this.y);
  }

  _draw(canvas: Canvas, dx: number, dy: number): this {
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

    const tw = this.width;
    const th = this.height;

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

