import { UpdateParameter } from "../01_base/Application";
import { BaseObject } from "./BaseObject";

export class Apple extends BaseObject {
  constructor() {
    super("./assets/apple.png", 32, 32);
  }

  algorithm(options: UpdateParameter): void {
  }
}

