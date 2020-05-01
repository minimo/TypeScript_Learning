var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define("01_base/Texture", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Texture = /** @class */ (function () {
        function Texture(path) {
            var _this = this;
            this.path = path;
            this._img = new Image();
            this._img.onload = function () {
                _this._isLoaded = true;
            };
            this._img.src = path;
            this._isLoaded = false;
        }
        Object.defineProperty(Texture.prototype, "image", {
            get: function () {
                return this._img;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Texture.prototype, "isLoaded", {
            get: function () {
                return this._isLoaded;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Texture.prototype, "width", {
            get: function () {
                return this._img.width;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Texture.prototype, "height", {
            get: function () {
                return this._img.height;
            },
            enumerable: true,
            configurable: true
        });
        return Texture;
    }());
    exports.Texture = Texture;
});
define("01_base/Canvas", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Canvas = /** @class */ (function () {
        function Canvas(query, width, height) {
            if (width === void 0) { width = 100; }
            if (height === void 0) { height = 100; }
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
        Canvas.prototype.draw = function (texture, sx, sy, sw, sh, dx, dy, dw, dh) {
            var _a;
            (_a = this._context) === null || _a === void 0 ? void 0 : _a.drawImage(texture.image, sx, sy, sw, sh, dx, dy, dw, dh);
        };
        Canvas.prototype.clear = function () {
            var _a;
            (_a = this._context) === null || _a === void 0 ? void 0 : _a.clearRect(0, 0, this.domElement.width, this.domElement.height);
            return this;
        };
        Canvas.prototype.drawLine = function (sx, sy, ex, ey, color, width) {
            if (color === void 0) { color = "black"; }
            if (width === void 0) { width = 1; }
            var context = this._context;
            context.beginPath();
            context.moveTo(sx, sy);
            context.lineTo(ex, ey);
            context.strokeStyle = color;
            context.lineWidth = width;
            context.stroke();
            return this;
        };
        Object.defineProperty(Canvas.prototype, "canvas", {
            get: function () {
                return this.domElement;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Canvas.prototype, "context", {
            get: function () {
                return this.context;
            },
            enumerable: true,
            configurable: true
        });
        return Canvas;
    }());
    exports.Canvas = Canvas;
});
define("01_base/BaseScene", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BaseScene = /** @class */ (function () {
        function BaseScene() {
        }
        BaseScene.prototype.update = function (options) {
        };
        return BaseScene;
    }());
    exports.BaseScene = BaseScene;
});
define("01_base/Keyboard", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Keyboard = /** @class */ (function () {
        function Keyboard() {
            var _this = this;
            this.KEYLIST = [];
            document.addEventListener('keydown', function (e) {
                _this.KEYLIST[e.keyCode] = true;
            });
            document.addEventListener('keyup', function (e) {
                _this.KEYLIST[e.keyCode] = false;
            });
            document.addEventListener('keypress', function (e) {
            });
        }
        Keyboard.prototype.getKeyDown = function (key) {
            var code = Keyboard.KEY_CODE[key];
            return this.KEYLIST[code];
        };
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
        return Keyboard;
    }());
    exports.Keyboard = Keyboard;
});
define("01_base/Application", ["require", "exports", "01_base/Canvas", "01_base/Keyboard"], function (require, exports, Canvas_1, Keyboard_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Application = /** @class */ (function () {
        function Application(query, width, height) {
            if (width === void 0) { width = 640; }
            if (height === void 0) { height = 480; }
            this.width = width;
            this.height = height;
            this._isRunning = false;
            this._time = 0;
            this._currentScene = null;
            this._canvas = new Canvas_1.Canvas(query, width, height);
            this._keyboard = new Keyboard_1.Keyboard();
        }
        Application.prototype.setScene = function (scene) {
            this._currentScene = scene;
            return this;
        };
        Application.prototype.run = function () {
            var _this = this;
            var mainLoop = function () {
                var _a;
                (_a = _this._canvas) === null || _a === void 0 ? void 0 : _a.clear();
                if (_this._currentScene) {
                    _this._currentScene.update({
                        canvas: _this._canvas,
                        time: _this._time,
                        keyboard: _this._keyboard,
                    });
                }
                _this._time++;
                setTimeout(mainLoop, 33);
            };
            setTimeout(mainLoop, 33);
        };
        Application.prototype.runner = function (runFunc, delay) {
            setTimeout(runFunc, delay);
        };
        Object.defineProperty(Application.prototype, "keyboard", {
            get: function () {
                return this._keyboard;
            },
            enumerable: true,
            configurable: true
        });
        return Application;
    }());
    exports.Application = Application;
});
define("01_base/Object2D", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Object2D = /** @class */ (function () {
        function Object2D() {
        }
        Object2D.prototype.setPosition = function (x, y) {
            this.x = x;
            this.y = y;
            return this;
        };
        Object2D.prototype.update = function (options) {
        };
        return Object2D;
    }());
    exports.Object2D = Object2D;
});
define("01_base/Sprite", ["require", "exports", "01_base/Texture", "01_base/Object2D"], function (require, exports, Texture_1, Object2D_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Sprite = /** @class */ (function (_super) {
        __extends(Sprite, _super);
        function Sprite(path, _width, _height) {
            var _this = _super.call(this) || this;
            _this._width = _width;
            _this._height = _height;
            _this._frameIndex = 0;
            _this.texture = new Texture_1.Texture(path);
            _this.srcRect = { x: 0, y: 0, width: 0, height: 0 };
            return _this;
        }
        Sprite.prototype.draw = function (canvas) {
            return this._draw(canvas, this.x, this.y);
        };
        Sprite.prototype._draw = function (canvas, dx, dy) {
            if (!this.texture.isLoaded)
                return this;
            this.setFrameIndex(this._frameIndex);
            var sx = this.srcRect.x;
            var sy = this.srcRect.y;
            var sw = this.srcRect.width;
            var sh = this.srcRect.height;
            canvas.draw(this.texture, sx, sy, sw, sh, dx, dy, sw, sh);
            return this;
        };
        Sprite.prototype.setFrameIndex = function (index) {
            var image = this.texture.image;
            var tw = this._width;
            var th = this._height;
            var row = ~~(image.width / tw);
            var col = ~~(image.height / th);
            var maxIndex = row * col;
            var _index = index % maxIndex;
            var x = _index % row;
            var y = ~~(_index / row);
            this.srcRect.x = x * tw;
            this.srcRect.y = y * th;
            this.srcRect.width = tw;
            this.srcRect.height = th;
            this._frameIndex = index;
            return this;
        };
        return Sprite;
    }(Object2D_1.Object2D));
    exports.Sprite = Sprite;
});
define("02_components/Player", ["require", "exports", "01_base/Sprite"], function (require, exports, Sprite_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Player = /** @class */ (function (_super) {
        __extends(Player, _super);
        function Player() {
            var _this = _super.call(this, "./assets/neko.png", 32, 32) || this;
            _this.flick = 0;
            _this._isJump = false;
            _this.vy = 0;
            _this.time = 0;
            _this.setFrameIndex(4);
            return _this;
        }
        Player.prototype.update = function (options) {
            if (this._isJump) {
                this.setFrameIndex(5);
                this.time = 0;
                this.flick = 1;
            }
            else {
                if (this.time % 5 == 0) {
                    this.flick = (this.flick + 1) % 2;
                    this.setFrameIndex(4 + this.flick);
                }
                this.time++;
            }
            this.y += this.vy;
            if (this._isJump) {
                this.vy += 0.45;
            }
            if (this.y > 200 - 28) {
                this._isJump = false;
                this.y = 200 - 28;
                this.vy = 0;
            }
            this.draw(options.canvas);
        };
        Player.prototype.jump = function () {
            if (this._isJump)
                return this;
            this._isJump = true;
            this.vy = -5;
            return this;
        };
        return Player;
    }(Sprite_1.Sprite));
    exports.Player = Player;
});
define("02_components/GameScene", ["require", "exports", "01_base/BaseScene", "02_components/Player"], function (require, exports, BaseScene_1, Player_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var GameScene = /** @class */ (function (_super) {
        __extends(GameScene, _super);
        function GameScene() {
            var _this = _super.call(this) || this;
            _this.player = new Player_1.Player().setPosition(100, 200 - 28);
            return _this;
        }
        GameScene.prototype.update = function (options) {
            var keyboard = options.keyboard;
            if (keyboard.getKeyDown("space")) {
                this.player.jump();
            }
            this.player.update(options);
            options.canvas.drawLine(0, 200, 640, 200, "black", 2);
        };
        return GameScene;
    }(BaseScene_1.BaseScene));
    exports.GameScene = GameScene;
});
define("main", ["require", "exports", "01_base/Application", "02_components/GameScene"], function (require, exports, Application_1, GameScene_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var app = new Application_1.Application("world", 600, 400);
    var gameScene = new GameScene_1.GameScene();
    app.setScene(gameScene);
    app.run();
});
//# sourceMappingURL=bundle.js.map