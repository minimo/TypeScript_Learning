import { Application } from './01_base/Application';
import { Canvas } from "./01_base/Canvas";
import { Sprite } from "./01_base/Sprite";
import { GameScene } from './02_components/GameScene';

const app = new Application("world", 600, 400);
const gameScene = new GameScene();

app.setScene(gameScene);
app.run();
