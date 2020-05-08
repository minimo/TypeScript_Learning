interface KeyCode {
  [key: string]: number;
}

export class Keyboard {
  protected KEYLIST: boolean[];

  constructor() {
    this.KEYLIST = [];
    document.addEventListener('keydown', (e: any) => {
      this.KEYLIST[e.keyCode] = true;
    });
    document.addEventListener('keyup', (e: any) => {
      this.KEYLIST[e.keyCode] = false;
    });
    document.addEventListener('keypress', (e: any) => {
    });
  }

  getKeyDown(key: string): boolean {
    const code = Keyboard.KEY_CODE[key];
    return this.KEYLIST[code];
  }

  static KEY_CODE: KeyCode = {
    "backspace" : 8,
    "tab"       : 9,
    "enter"     : 13,
    "return"    : 13,
    "shift"     : 16,
    "ctrl"      : 17,
    "alt"       : 18,
    "pause"     : 19,
    "capslock"  : 20,
    "escape"    : 27,
    "pageup"    : 33,
    "pagedown"  : 34,
    "end"       : 35,
    "home"      : 36,
    "left"      : 37,
    "up"        : 38,
    "right"     : 39,
    "down"      : 40,
    "insert"    : 45,
    "delete"    : 46,
    "space"     : 32
  }
}

