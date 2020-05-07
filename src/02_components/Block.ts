import { Sprite } from "../01_base/Sprite";
import { UpdateParameter } from "../01_base/Application";

export class Block extends Sprite {
 
  constructor() {
    super("./assets/block.png", 32, 32);
  }

  update(options: UpdateParameter) {
    this.x -= 8;
  }
}

