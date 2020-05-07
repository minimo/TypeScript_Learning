import { BaseScene } from "../01_base/BaseScene";
import { UpdateParameter } from "../01_base/Application";
import { Label } from "../01_base/Label";
import { Player } from "./Player";
import { Block } from "./Block";

export class GameScene extends BaseScene {

  private player: Player;
  private score: number;
  private level: number;
  private scoreLabel: Label;

  private blocks: Block[];

  private time: number;

  constructor() {
    super();
    this.player = new Player().setPosition(100, 200 - 28);
    this.score = 0;
    this.level = 1;
    this.time = 0;

    this.blocks = [];

    this.scoreLabel = new Label("Score:")
      .setPosition(40, 60)
      .setAlign("left");
  }

  update(options: UpdateParameter): void {
    
    const keyboard = options.keyboard;
    if (keyboard.getKeyDown("space")) {
      this.player.jump();
    }
    
    const canvas = options.canvas;
    this.player.update(options);
   
    this.scoreLabel.text = `Score: ${this.score}`;
    this.scoreLabel.draw(canvas);

    canvas.drawLine(0, 200, 640, 200, "black", 2);

    if (this.time % 2 == 0) this.score++;
    if (this.time % 60 == 0) this.enterBlock();

    this.blocks.forEach(block => {
      block.update(options);
      block.draw(canvas);
    });

    this.time++;
  }

  enterBlock(): void {
    const block = new Block().setPosition(700, 200 - 32);
    this.blocks.push(block);
  }
}

