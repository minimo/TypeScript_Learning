import { UpdateParameter } from "../01_base/Application";
import { BaseObject } from "./BaseObject";

export class Block extends BaseObject {
  constructor() {
    super("./assets/block.png", 32, 32);
  }

  algorithm(options: UpdateParameter): void {
  }
}

