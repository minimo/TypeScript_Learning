import { BaseScene } from "../01_base/BaseScene";
import { UpdateParameter } from "../01_base/Application";
import { GameScene } from "./GameScene";
import { Sprite } from "../01_base/Sprite";
import { Label } from "../01_base/Label";

export class TitleScene extends BaseScene {

  isExit: boolean;
  titleImage: Sprite;
  titleText1: Label;
  titleText2: Label;

  constructor() {
    super();
    this.isExit = false;
    this.titleImage = new Sprite("./assets/cat.jpg", 300, 200)
      .setPosition(320 - 150, 100);

    this.titleText1 = new Label("Straycat over run!")
      .setPosition(320, 80)
      .setFontSize(30);

    this.titleText2 = new Label("PRESS SPACE KEY")
      .setPosition(320, 320)
      .setFontSize(20);
  }

  update(options: UpdateParameter): void {

    const canvas = options.canvas;
    this.titleImage.draw(canvas);
    this.titleText1.draw(canvas);
    this.titleText2.draw(canvas);
    if (this.isExit) return;

    const keyboard = options.keyboard;
    if (keyboard.getKeyDown("space")) {
      const gameScene = new GameScene();
      options.app.setScene(gameScene);
      this.isExit = true;
    }
  }
}

