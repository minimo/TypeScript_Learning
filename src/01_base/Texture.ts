export class Texture {
  protected _path: string;
  protected _img: HTMLImageElement;
  protected _isLoaded: boolean;

  protected loadedCallback: { (texture: Texture): void };

  constructor(path: string = null) {
    this._path = path;
    if (this._path) {
      this.load(path);
    } else {
      this._img = null;
    }
    this._isLoaded = false;
  }

  load(path: string): Promise<any> {
    return new Promise(resolve => {
      this._img = new Image();
      this._img.onload = () => {
        this._isLoaded = true;
        resolve();
      }
      this._img.src = path;
      this._path = path;
    });
  }

  get image(): HTMLImageElement {
    return this._img;
  }

  get isLoaded(): boolean {
    return this._isLoaded;
  }

  get width(): number {
    return this._img.width;
  }

  get height(): number {
    return this._img.height;
  }

}

