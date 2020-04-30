define("texture", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Texture {
        constructor(path) {
            this.path = path;
            this._img = new Image();
            this._img.onload = () => {
                this._isLoaded = true;
            };
            this._img.src = path;
            this._isLoaded = false;
        }
        get image() {
            return this._img;
        }
        get isLoaded() {
            return this._isLoaded;
        }
        get width() {
            return this._img.width;
        }
        get height() {
            return this._img.height;
        }
    }
    exports.Texture = Texture;
});
define("canvas", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Canvas {
        constructor(query, width = 100, height = 100) {
            this.width = width;
            this.height = height;
            if (query != "") {
                this.domElement = document.getElementById(query);
            }
            else {
                this.domElement = document.createElement("canvas");
                document.appendChild(this.domElement);
            }
            this.domElement.width = width;
            this.domElement.height = height;
            this.context = this.domElement.getContext("2d");
        }
        draw(texture, sx, sy, sw, sh, dx, dy, dw, dh) {
            this.context.drawImage(texture.image, sx, sy, sw, sh, dx, dy, dw, dh);
        }
        clear() {
            this.context.clearRect(0, 0, this.domElement.width, this.domElement.height);
        }
    }
    exports.Canvas = Canvas;
});
define("Application", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Application {
        constructor(query, width = 640, height = 480) {
            this.width = width;
            this.height = height;
        }
    }
    exports.Application = Application;
});
define("Sprite", ["require", "exports", "texture"], function (require, exports, texture_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Sprite {
        constructor(path, _width, _height) {
            this.path = path;
            this._width = _width;
            this._height = _height;
            this._frameIndex = 0;
            this.texture = new texture_1.Texture(path);
            this.srcRect = { x: 0, y: 0, width: 0, height: 0 };
        }
        draw(canvas, dx, dy) {
            if (!this.texture.isLoaded)
                return this;
            this.setFrameIndex(this._frameIndex);
            const sx = this.srcRect.x;
            const sy = this.srcRect.y;
            const sw = this.srcRect.width;
            const sh = this.srcRect.height;
            canvas.draw(this.texture, sx, sy, sw, sh, dx, dy, sw, sh);
            return this;
        }
        setFrameIndex(index) {
            const image = this.texture.image;
            const tw = this._width;
            const th = this._height;
            const row = ~~(image.width / tw);
            const col = ~~(image.height / th);
            const maxIndex = row * col;
            const _index = index % maxIndex;
            const x = _index % row;
            const y = ~~(_index / row);
            this.srcRect.x = x * tw;
            this.srcRect.y = y * th;
            this.srcRect.width = tw;
            this.srcRect.height = th;
            this._frameIndex = index;
            return this;
        }
    }
    exports.Sprite = Sprite;
});
define("main", ["require", "exports", "canvas", "Sprite"], function (require, exports, canvas_1, Sprite_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const canvas = new canvas_1.Canvas("world", 600, 400);
    const sprite = new Sprite_1.Sprite("./assets/neko.png", 32, 32);
    let flick = 0;
    let time = 1;
    const mainLoop = () => {
        if (time % 10 == 0) {
            sprite.setFrameIndex(4 + flick);
            flick = (flick + 1) % 2;
        }
        canvas.clear();
        sprite.draw(canvas, 10, 10);
        time++;
        setTimeout(mainLoop, 33);
    };
    setTimeout(mainLoop, 33);
});
