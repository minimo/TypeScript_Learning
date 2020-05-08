import { Sprite } from "../01_base/Sprite";
import { UpdateParameter } from "../01_base/Application";
import { Object2D } from "../01_base/Object2D";
import { Canvas } from "../01_base/Canvas";

export class Player extends Object2D {

  protected flick: number;
  protected _isJump: boolean;
  protected vy: number;
  protected time: number;

  protected sprite: Sprite;

  constructor() {
    super();

    this.flick = 0;
    this._isJump = false;
    this.vy = 0;
    this.time = 0;

    this.width = 32;
    this.height = 32;
   
    this.sprite = new Sprite("./assets/neko.png", 32, 32)
      .setFrameIndex(4)
      .setPosition(0, 0);
  }

  update(options: UpdateParameter) {
    if (this._isJump) {
      this.sprite.setFrameIndex(5);
      this.time = 0;
      this.flick = 1;
    } else {
      if (this.time % 5 == 0) {
        this.flick = (this.flick + 1) % 2;
        this.sprite.setFrameIndex(4 + this.flick);
      }
      this.time++;
    }
    this.y += this.vy;
    if (this._isJump) {
      this.vy += 0.98;
    }
    if (this.y > 200 - 28) {
      this._isJump = false;
      this.y = 200 - 28;
      this.vy = 0;
    }

    this.sprite.setPosition(this.x, this.y);
  }

  jump(): this {
    if (this._isJump) return this;

    this._isJump = true;
    this.vy = -10;

    return this;
  }

  draw(canvas: Canvas) {
    this.sprite.draw(canvas);
  }
}

