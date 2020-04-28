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
        getImage() {
            return this._img;
        }
        get isLoaded() {
            return this._isLoaded;
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
            this.domElement = document.getElementById(query);
            this.domElement.width = width;
            this.domElement.height = height;
            this.context = this.domElement.getContext("2d");
        }
        draw(texture, x = 0, y = 0) {
            const img = texture.getImage();
            this.context.drawImage(img, x, y);
        }
    }
    exports.Canvas = Canvas;
});
define("main", ["require", "exports", "canvas", "texture"], function (require, exports, canvas_1, texture_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const canvas = new canvas_1.Canvas("world", 600, 400);
    const image = new texture_1.Texture("./assets/cat.jpg");
    const waitLoad = () => {
        if (image.isLoaded) {
            canvas.draw(image, 10, 10);
            return;
        }
        setTimeout(waitLoad, 100);
    };
    setTimeout(waitLoad, 100);
});
