import { UpdateParameter } from "./Application";

export class Object2D {

  public x: number;
  public y: number;

  constructor() {
  }

  setPosition(x: number, y: number): this {
    this.x = x;
    this.y = y;
    return this;
  }

  update(options: UpdateParameter): void {
  }

}

