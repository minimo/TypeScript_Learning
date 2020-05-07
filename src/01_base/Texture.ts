export class Texture {
  private _img: HTMLImageElement;
  private _isLoaded: boolean;

  constructor(public path: string = null) {
    this._img = new Image();
    this._img.onload = () => {
      this._isLoaded = true;
    }
    this._img.src = path;

    this._isLoaded = false;
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

