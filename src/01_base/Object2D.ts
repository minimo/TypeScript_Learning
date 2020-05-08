import { UpdateParameter } from "./Application";

export class Object2D {

  public x: number;
  public y: number;

  constructor(public width: number = 1, public height: number = 1) {
    this.x = 0;
    this.y = 1;
  }

  setPosition(x: number, y: number): this {
    this.x = x;
    this.y = y;
    return this;
  }

  update(options: UpdateParameter): void {
  }

  hitTest(target: Object2D): boolean {
    const left1 = this.x;
    const right1 = this.x + this.width;
    const top1 = this.y;
    const bottom1 = this.y + this.height;

    const left2 = target.x;
    const right2 = target.x + target.width;
    const top2 = target.y;
    const bottom2 = target.y + target.height;

    return (left1 < right2) && (right1 > left2) && (top1 < bottom2) && (bottom1 > top2);
  }

}

