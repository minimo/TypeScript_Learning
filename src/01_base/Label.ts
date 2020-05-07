import { Canvas } from "./Canvas";
import { Object2D } from "./Object2D";

export class Label extends Object2D {

  public x: number;
  public y: number;

  private _font: string;
  private _fontSize: string;
  private _fillStyle: string;
  private _textAlign: CanvasTextAlign;
  private _textBaseline: CanvasTextBaseline;

  constructor(public text: string) {
    super();
    this._font = "ヒラギノゴシック ProN"
    this._fontSize = "14px";
    this._fillStyle = "black";
    this._textAlign = "center";
    this._textBaseline = "middle";
    this.x = 0;
    this.y = 0;
  }

  draw(canvas: Canvas): this {
    const context = canvas.context;
    context.font = `${this._fontSize} '${this._font}'`;
    context.fillStyle = this._fillStyle;
    context.textAlign = this._textAlign;
    context.textBaseline = this._textBaseline;
    context.fillText(this.text, this.x, this.y);
    return this;
  }

  setFontSize(size: string | number): this {
    this.fontSize = size;
    return this;
  }

  setAlign(align: CanvasTextAlign): this {
    this.align = align;
    return this;
  }

  setBaseline(baseline: CanvasTextBaseline): this {
    this.baseline = baseline;
    return this;
  }

  set fontSize(value: string | number) {
    if (typeof value == "string") {
      this._fontSize = value;
    } else {
      this._fontSize = `${value}px`;
    }
  }

  set fillStyle(value: string) {
    this._fillStyle = value;
  }

  set align(value: CanvasTextAlign) {
    this._textAlign = value;
  }

  set baseline(value: CanvasTextBaseline) {
    this._textBaseline = value;
  }


}

