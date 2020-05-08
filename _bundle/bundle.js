define("01_base/Texture", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Texture {
        constructor(path = null) {
            this._path = path;
            if (this._path) {
                this.load(path);
            }
            else {
                this._img = null;
            }
            this._isLoaded = false;
        }
        load(path) {
            return new Promise(resolve => {
                this._img = new Image();
                this._img.onload = () => {
                    this._isLoaded = true;
                    resolve();
                };
                this._img.src = path;
                this._path = path;
            });
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
define("01_base/Canvas", ["require", "exports"], function (require, exports) {
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
            this._context = this.domElement.getContext("2d");
        }
        draw(texture, sx, sy, sw, sh, dx, dy, dw, dh) {
            var _a;
            (_a = this._context) === null || _a === void 0 ? void 0 : _a.drawImage(texture.image, sx, sy, sw, sh, dx, dy, dw, dh);
        }
        clear() {
            var _a;
            (_a = this._context) === null || _a === void 0 ? void 0 : _a.clearRect(0, 0, this.domElement.width, this.domElement.height);
            return this;
        }
        drawLine(sx, sy, ex, ey, color = "black", width = 1) {
            const context = this._context;
            context.beginPath();
            context.moveTo(sx, sy);
            context.lineTo(ex, ey);
            context.strokeStyle = color;
            context.lineWidth = width;
            context.stroke();
            return this;
        }
        get canvas() {
            return this.domElement;
        }
        get context() {
            return this._context;
        }
    }
    exports.Canvas = Canvas;
});
define("01_base/BaseScene", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class BaseScene {
        constructor() {
        }
        update(options) {
        }
    }
    exports.BaseScene = BaseScene;
});
define("01_base/Keyboard", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Keyboard {
        constructor() {
            this.KEYLIST = [];
            document.addEventListener('keydown', (e) => {
                this.KEYLIST[e.keyCode] = true;
            });
            document.addEventListener('keyup', (e) => {
                this.KEYLIST[e.keyCode] = false;
            });
            document.addEventListener('keypress', (e) => {
            });
        }
        getKeyDown(key) {
            const code = Keyboard.KEY_CODE[key];
            return this.KEYLIST[code];
        }
    }
    exports.Keyboard = Keyboard;
    Keyboard.KEY_CODE = {
        "backspace": 8,
        "tab": 9,
        "enter": 13,
        "return": 13,
        "shift": 16,
        "ctrl": 17,
        "alt": 18,
        "pause": 19,
        "capslock": 20,
        "escape": 27,
        "pageup": 33,
        "pagedown": 34,
        "end": 35,
        "home": 36,
        "left": 37,
        "up": 38,
        "right": 39,
        "down": 40,
        "insert": 45,
        "delete": 46,
        "space": 32
    };
});
define("01_base/Application", ["require", "exports", "01_base/Canvas", "01_base/Keyboard"], function (require, exports, Canvas_1, Keyboard_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Application {
        constructor(query, width = 640, height = 480) {
            this.width = width;
            this.height = height;
            this._isRunning = false;
            this._time = 0;
            this._currentScene = null;
            this._canvas = new Canvas_1.Canvas(query, width, height);
            this._keyboard = new Keyboard_1.Keyboard();
        }
        setScene(scene) {
            this._currentScene = scene;
            return this;
        }
        run() {
            const mainLoop = () => {
                var _a;
                (_a = this._canvas) === null || _a === void 0 ? void 0 : _a.clear();
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
            };
            setTimeout(mainLoop, 33);
        }
        runner(runFunc, delay) {
            setTimeout(runFunc, delay);
        }
        get keyboard() {
            return this._keyboard;
        }
    }
    exports.Application = Application;
});
define("01_base/Object2D", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Object2D {
        constructor(width = 1, height = 1) {
            this.width = width;
            this.height = height;
            this.x = 0;
            this.y = 1;
        }
        setPosition(x, y) {
            this.x = x;
            this.y = y;
            return this;
        }
        update(options) {
        }
        hitTest(target) {
            const left1 = this.x;
            const right1 = this.x + this.width;
            const top1 = this.y;
            const bottom1 = this.y + this.height;
            const left2 = target.x;
            const right2 = target.x + target.width;
            const top2 = target.y;
            const bottom2 = target.y + target.height;
            return (left1 < right2) && (right1 > left2) && (top1 < bottom2) && (bottom1 > top2);
        }
    }
    exports.Object2D = Object2D;
});
define("01_base/Sprite", ["require", "exports", "01_base/Texture", "01_base/Object2D"], function (require, exports, Texture_1, Object2D_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Sprite extends Object2D_1.Object2D {
        constructor(path, width, height) {
            super(width, height);
            this._frameIndex = 0;
            this.texture = new Texture_1.Texture(path);
            this.srcRect = { x: 0, y: 0, width: 0, height: 0 };
        }
        draw(canvas) {
            return this._draw(canvas, this.x, this.y);
        }
        _draw(canvas, dx, dy) {
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
            const tw = this.width;
            const th = this.height;
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
define("01_base/Label", ["require", "exports", "01_base/Object2D"], function (require, exports, Object2D_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Label extends Object2D_2.Object2D {
        constructor(text) {
            super();
            this.text = text;
            this._font = "ヒラギノゴシック ProN";
            this._fontSize = "14px";
            this._fillStyle = "black";
            this._textAlign = "center";
            this._textBaseline = "middle";
            this.x = 0;
            this.y = 0;
        }
        draw(canvas) {
            const context = canvas.context;
            context.font = `${this._fontSize} '${this._font}'`;
            context.fillStyle = this._fillStyle;
            context.textAlign = this._textAlign;
            context.textBaseline = this._textBaseline;
            context.fillText(this.text, this.x, this.y);
            return this;
        }
        setFontSize(size) {
            this.fontSize = size;
            return this;
        }
        setAlign(align) {
            this.align = align;
            return this;
        }
        setBaseline(baseline) {
            this.baseline = baseline;
            return this;
        }
        set fontSize(value) {
            if (typeof value == "string") {
                this._fontSize = value;
            }
            else {
                this._fontSize = `${value}px`;
            }
        }
        set fillStyle(value) {
            this._fillStyle = value;
        }
        set align(value) {
            this._textAlign = value;
        }
        set baseline(value) {
            this._textBaseline = value;
        }
    }
    exports.Label = Label;
});
define("02_components/Player", ["require", "exports", "01_base/Sprite", "01_base/Object2D"], function (require, exports, Sprite_1, Object2D_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Player extends Object2D_3.Object2D {
        constructor() {
            super();
            this.flick = 0;
            this._isJump = false;
            this.vy = 0;
            this.time = 0;
            this.width = 32;
            this.height = 32;
            this.sprite = new Sprite_1.Sprite("./assets/neko.png", 32, 32)
                .setFrameIndex(4)
                .setPosition(0, 0);
        }
        update(options) {
            if (this._isJump) {
                this.sprite.setFrameIndex(5);
                this.time = 0;
                this.flick = 1;
            }
            else {
                if (this.time % 5 == 0) {
                    this.flick = (this.flick + 1) % 2;
                    this.sprite.setFrameIndex(4 + this.flick);
                }
                this.time++;
            }
            this.y += this.vy;
            if (this._isJump) {
                this.vy += 0.98;
            }
            if (this.y > 200 - 28) {
                this._isJump = false;
                this.y = 200 - 28;
                this.vy = 0;
            }
            this.sprite.setPosition(this.x, this.y);
        }
        jump() {
            if (this._isJump)
                return this;
            this._isJump = true;
            this.vy = -10;
            return this;
        }
        draw(canvas) {
            this.sprite.draw(canvas);
        }
    }
    exports.Player = Player;
});
define("02_components/BaseObject", ["require", "exports", "01_base/Sprite"], function (require, exports, Sprite_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class BaseObject extends Sprite_2.Sprite {
        constructor(path, width, height) {
            super(path, width, height);
            this.isDelete = false;
        }
        update(options) {
            this.x -= 8;
            if (this.x < -32)
                this.isDelete = true;
            this.algorithm(options);
        }
    }
    exports.BaseObject = BaseObject;
});
define("02_components/Block", ["require", "exports", "02_components/BaseObject"], function (require, exports, BaseObject_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Block extends BaseObject_1.BaseObject {
        constructor() {
            super("./assets/block.png", 32, 32);
        }
        algorithm(options) {
        }
    }
    exports.Block = Block;
});
define("02_components/GameScene", ["require", "exports", "01_base/BaseScene", "01_base/Label", "02_components/Player", "02_components/Block"], function (require, exports, BaseScene_1, Label_1, Player_1, Block_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class GameScene extends BaseScene_1.BaseScene {
        constructor() {
            super();
            this.player = new Player_1.Player().setPosition(100, 200 - 28);
            this.score = 0;
            this.level = 1;
            this.time = 0;
            this.isGameover = false;
            this.blocks = [];
            this.scoreLabel = new Label_1.Label("Score:")
                .setPosition(40, 60)
                .setAlign("left");
            this.gameoverLabel = new Label_1.Label("GAME OVER")
                .setPosition(320, 150)
                .setFontSize(30);
        }
        update(options) {
            const keyboard = options.keyboard;
            if (keyboard.getKeyDown("space")) {
                this.player.jump();
            }
            const canvas = options.canvas;
            canvas.drawLine(0, 200, 640, 200, "black", 2);
            this.scoreLabel.text = `Score: ${this.score}`;
            this.scoreLabel.draw(canvas);
            if (!this.isGameover) {
                if (this.time % 2 == 0)
                    this.score++;
                if (this.time % 60 == 0)
                    this.enterBlock();
                this.player.update(options);
            }
            else {
                this.gameoverLabel.draw(canvas);
            }
            this.player.draw(canvas);
            this.blocks.forEach(block => {
                if (!this.isGameover)
                    block.update(options);
                block.draw(canvas);
                if (this.player.hitTest(block))
                    this.isGameover = true;
            });
            this.blocks = this.blocks.filter(block => !block.isDelete);
            this.time++;
        }
        enterBlock() {
            const block = new Block_1.Block().setPosition(700, 200 - 32);
            this.blocks.push(block);
        }
    }
    exports.GameScene = GameScene;
});
define("02_components/TitleScene", ["require", "exports", "01_base/BaseScene", "02_components/GameScene", "01_base/Sprite", "01_base/Label"], function (require, exports, BaseScene_2, GameScene_1, Sprite_3, Label_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class TitleScene extends BaseScene_2.BaseScene {
        constructor() {
            super();
            this.isExit = false;
            this.titleImage = new Sprite_3.Sprite("./assets/cat.jpg", 300, 200)
                .setPosition(320 - 150, 100);
            this.titleText1 = new Label_2.Label("Straycat over run!")
                .setPosition(320, 80)
                .setFontSize(30);
            this.titleText2 = new Label_2.Label("PRESS SPACE KEY")
                .setPosition(320, 320)
                .setFontSize(20);
        }
        update(options) {
            const canvas = options.canvas;
            this.titleImage.draw(canvas);
            this.titleText1.draw(canvas);
            this.titleText2.draw(canvas);
            if (this.isExit)
                return;
            const keyboard = options.keyboard;
            if (keyboard.getKeyDown("space")) {
                const gameScene = new GameScene_1.GameScene();
                options.app.setScene(gameScene);
                this.isExit = true;
            }
        }
    }
    exports.TitleScene = TitleScene;
});
define("main", ["require", "exports", "01_base/Application", "02_components/TitleScene"], function (require, exports, Application_1, TitleScene_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const app = new Application_1.Application("world", 600, 400);
    const titleScene = new TitleScene_1.TitleScene();
    app.setScene(titleScene);
    app.run();
});
define("02_components/Apple", ["require", "exports", "02_components/BaseObject"], function (require, exports, BaseObject_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Apple extends BaseObject_2.BaseObject {
        constructor() {
            super("./assets/apple.png", 32, 32);
        }
        algorithm(options) {
        }
    }
    exports.Apple = Apple;
});
//# sourceMappingURL=bundle.js.map