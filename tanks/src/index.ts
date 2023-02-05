import Phaser from 'phaser';
import './global.css';
import StartScene from './ts/scenes/StartScene';
import GameScene from './ts/scenes/GameScene';

const config = {
    type: Phaser.AUTO,
    parent: 'app',
    with: 600,
    height: 800,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false,
        },
    },
    scene: [StartScene, GameScene],
};

const game = new Phaser.Game(config);
