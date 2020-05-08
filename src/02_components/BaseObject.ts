import { Sprite } from "../01_base/Sprite";
import { UpdateParameter } from "../01_base/Application";
import { Object2D } from "../01_base/Object2D";

export abstract class BaseObject extends Sprite {
  public isDelete: boolean;

  constructor(path: string, width: number, height: number) {
    super(path, width, height);
    this.isDelete = false;
  }

  update(options: UpdateParameter) {
    this.x -= 8;
    if (this.x < -32) this.isDelete = true;
    this.algorithm(options)
  }

  abstract algorithm(options: UpdateParameter): void;
}
