import { Sprite } from "../01_base/Sprite";
import { UpdateParameter } from "../01_base/Application";

export class Player extends Sprite {

  private flick: number;
  private _isJump: boolean;
  private vy: number;
  private time: number;

  constructor() {
    super("./assets/neko.png", 32, 32);

    this.flick = 0;
    this._isJump = false;
    this.vy = 0;
    this.time = 0;

    this.setFrameIndex(4);
  }

  update(options: UpdateParameter) {
    if (this._isJump) {
      this.setFrameIndex(5);
      this.time = 0;
      this.flick = 1;
    } else {
      if (this.time % 5 == 0) {
        this.flick = (this.flick + 1) % 2;
        this.setFrameIndex(4 + this.flick);
      }
      this.time++;
    }
    this.y += this.vy;
    if (this._isJump) {
      this.vy += 0.45;
    }
    if (this.y > 200 - 28) {
      this._isJump = false;
      this.y = 200 - 28;
      this.vy = 0;
    }

    this.draw(options.canvas);
  }

  jump(): this {
    if (this._isJump) return this;

    this._isJump = true;
    this.vy = -7;

    return this;
  }
}

