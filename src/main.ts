import { Application } from './01_base/Application';
import { Canvas } from "./01_base/Canvas";
import { Sprite } from "./01_base/Sprite";
import { GameScene } from './02_components/GameScene';
import { TitleScene } from './02_components/TitleScene';

const app = new Application("world", 600, 400);
const titleScene = new TitleScene();

app.setScene(titleScene);
app.run();
