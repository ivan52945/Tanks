import Phaser from 'phaser';
import './global.css';
import StartScene from './ts/StartScene';

const config = {
    type: Phaser.AUTO,
    parent: 'app',
    with: 600,
    height: 800,
    scene: StartScene,
};

const game = new Phaser.Game(config);
