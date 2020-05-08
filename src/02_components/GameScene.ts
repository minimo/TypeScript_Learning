import { BaseScene } from "../01_base/BaseScene";
import { UpdateParameter } from "../01_base/Application";
import { Label } from "../01_base/Label";
import { Player } from "./Player";
import { Block } from "./Block";
import { BaseObject } from "./BaseObject";

export class GameScene extends BaseScene {

  protected player: Player;
  protected score: number;
  protected level: number;
  protected scoreLabel: Label;
  protected gameoverLabel: Label;

  protected blocks: BaseObject[];

  protected time: number;

  protected isGameover: boolean;

  constructor() {
    super();
    this.player = new Player().setPosition(100, 200 - 28);
    this.score = 0;
    this.level = 1;
    this.time = 0;
    this.isGameover = false;

    this.blocks = [];

    this.scoreLabel = new Label("Score:")
      .setPosition(40, 60)
      .setAlign("left");

    this.gameoverLabel = new Label("GAME OVER")
      .setPosition(320, 150)
      .setFontSize(30);
  }

  update(options: UpdateParameter): void {
    const keyboard = options.keyboard;
    if (keyboard.getKeyDown("space")) {
      this.player.jump();
    }
  
    const canvas = options.canvas;
    canvas.drawLine(0, 200, 640, 200, "black", 2);

    this.scoreLabel.text = `Score: ${this.score}`;
    this.scoreLabel.draw(canvas);

    if (!this.isGameover) {
      if (this.time % 2 == 0) this.score++;
      if (this.time % 60 == 0) this.enterBlock();
      this.player.update(options);
    } else {
      this.gameoverLabel.draw(canvas);
    }
    this.player.draw(canvas);

    this.blocks.forEach(block => {
      if (!this.isGameover) block.update(options);
      block.draw(canvas);
      if (this.player.hitTest(block)) this.isGameover = true;
    });

    this.blocks = this.blocks.filter(block => !block.isDelete);

    this.time++;
  }

  enterBlock(): void {
    const block = new Block().setPosition(700, 200 - 32);
    this.blocks.push(block);
  }
}

