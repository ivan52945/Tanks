import Phaser from 'phaser';
import './global.css';
import StartScene from './ts/StartScene';
import GameScene from './ts/GameScene';

const config = {
    type: Phaser.AUTO,
    parent: 'app',
    with: 600,
    height: 800,
    scene: [StartScene, GameScene],
};

const game = new Phaser.Game(config);
