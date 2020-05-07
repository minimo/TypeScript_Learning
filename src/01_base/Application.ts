import { Canvas } from "./Canvas";
import { BaseScene } from "./BaseScene";
import { Keyboard } from "./Keyboard";

export interface UpdateParameter {
  app: Application,
  canvas: Canvas,
  time: number,
  keyboard: Keyboard,
}

export class Application {
  private _canvas: Canvas;
  private _isRunning: boolean;
  private _currentScene: BaseScene;
  private _time: number;
  private _keyboard: Keyboard;

  constructor(query: string, public width: number = 640, public height: number = 480) {
    this._isRunning = false;
    this._time = 0;
    this._currentScene = null;
    this._canvas = new Canvas(query, width, height);
    this._keyboard = new Keyboard();
  }

  setScene(scene: BaseScene): this {
    this._currentScene = scene;
    return this;
  }

  run(): void {
    const mainLoop = () => {
      this._canvas?.clear();
      if (this._currentScene) {
        this._currentScene.update({
          app: this,
          canvas: this._canvas,
          time: this._time,
          keyboard: this._keyboard,
        });
      }
      this._time++;
      setTimeout(mainLoop, 33);
    }
    setTimeout(mainLoop, 33);
  }

  runner(runFunc:()=> void, delay: number) {
    setTimeout(runFunc, delay);
  }

  get keyboard(): Keyboard {
    return this._keyboard;
  }
}

