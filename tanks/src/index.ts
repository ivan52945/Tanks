import Phaser from 'phaser';
import './global.css';
import StartScene from './ts/scenes/start-scene/start-scene';
import GameScene from './ts/scenes/game-scene/game-scene';

const config = {
    type: Phaser.AUTO,
    parent: 'app',
    with: 600,
    height: 800,
    scene: [StartScene, GameScene],
};

const game = new Phaser.Game(config);
