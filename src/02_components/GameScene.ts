import { BaseScene } from "../01_base/BaseScene";
import { Sprite } from "../01_base/Sprite";
import { UpdateParameter } from "../01_base/Application";
import { Player } from "./Player";

export class GameScene extends BaseScene {

  private player: Player;

  constructor() {
    super();
    this.player = new Player().setPosition(100, 200 - 28);
  }

  update(options: UpdateParameter): void {
    const keyboard = options.keyboard;
    if (keyboard.getKeyDown("space")) {
      this.player.jump();
    }
    this.player.update(options);
    options.canvas.drawLine(0, 200, 640, 200, "black", 2);
  }
}

