import { BaseScene } from "../01_base/BaseScene";
import { UpdateParameter } from "../01_base/Application";
import { Label } from "../01_base/Label";
import { Player } from "./Player";
import { Block } from "./Block";
import { Apple } from "./Apple";
import { BaseObject } from "./BaseObject";
import { TitleScene } from "./TitleScene";

export class GameScene extends BaseScene {

  protected player: Player;
  protected score: number;
  protected level: number;
  protected scoreLabel: Label;
  protected gameoverLabel1: Label;
  protected gameoverLabel2: Label;
  protected gameoverLabel3: Label;

  protected blocks: BaseObject[];

  protected time: number;

  protected isGameover: boolean;
  protected isExit: boolean;

  constructor() {
    super();
    this.player = new Player().setPosition(100, 200 - 28);
    this.score = 0;
    this.level = 1;
    this.time = 0;
    this.isGameover = false;
    this.isExit = false;

    this.blocks = [];

    this.scoreLabel = new Label("Score:")
      .setPosition(40, 60)
      .setAlign("left");

    this.gameoverLabel1 = new Label("GAME OVER")
      .setPosition(320, 150)
      .setFontSize(30);
    this.gameoverLabel2 = new Label("")
      .setPosition(320, 180)
      .setFontSize(20);
    this.gameoverLabel3 = new Label("PRESS SPACE KEY")
      .setPosition(320, 250)
      .setFontSize(20);
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
      if (this.time % 5 == 0) this.score++;
      if (this.time % 60 == 0) this.enterBlock();
      if (this.time % 50 == 0) this.enterApple();
      this.player.update(options);
    }
    this.player.draw(canvas);

    this.blocks.forEach(block => {
      if (!this.isGameover) block.update(options);
      block.draw(canvas);
      if (this.player.hitTest(block) && !this.isGameover) {
        if (block instanceof Block) {
          this.isGameover = true;
          this.gameoverLabel2.text = `SCORE: ${this.score}`
          this.time = 0;
        }
        if (block instanceof Apple) {
          block.isDelete = true;
          this.score += 10;
        }
      }
    });

    this.blocks = this.blocks.filter(block => !block.isDelete);
    
    if (this.isGameover) {
      this.gameoverLabel1.draw(canvas);
      this.gameoverLabel2.draw(canvas);
      this.gameoverLabel3.draw(canvas);
      if (this.time > 30) {
        const keyboard = options.keyboard;
        if (keyboard.getKeyDown("space") && !this.isExit) {
          options.app.setScene(new TitleScene());
          this.isExit = true;
        }
      }
    }
    this.time++;
  }

  enterBlock(): void {
    const block = new Block().setPosition(700, 200 - 32);
    this.blocks.push(block);
  }

  enterApple(): void {
    const apple = new Apple().setPosition(700, 120);
    this.blocks.push(apple);
  }
}

