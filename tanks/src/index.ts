import Phaser from 'phaser';
import './global.css';
import StartScene from './ts/scenes/StartScene';
import GameScene from './ts/scenes/GameScene';
import ScoreScene from './ts/scenes/ScoreScene';
import HiscoreScene from './ts/scenes/HiscoreScene';
import GameOverScene from './ts/scenes/GameOverScene';

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
    scene: [StartScene, GameScene, ScoreScene, HiscoreScene, GameOverScene],
};

const game = new Phaser.Game(config);
