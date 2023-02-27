import Phaser from 'phaser';
import './global.css';
import LoadScene from './ts/scenes/LoadScene';
import StartScene from './ts/scenes/StartScene';
import GameScene from './ts/scenes/GameScene';
import ScoreScene from './ts/scenes/ScoreScene';
import HiscoreScene from './ts/scenes/HiscoreScene';
import GameOverScene from './ts/scenes/GameOverScene';
import StageNumberScene from './ts/scenes/StageNumberScene';
import TeamScene from './ts/scenes/TeamScene';
import PauseScene from './ts/scenes/PauseScene';

const config = {
    type: Phaser.AUTO,
    parent: 'app',
    width: 1024,
    height: 960,
    physics: {
        //*
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: true,
        },
        // */
        /*
        default: 'matter',
        matter: {
            enableSleeping: true,
            gravity: {
                y: 0,
            },
            debug: {
                showBody: true,
                showStaticBody: true,
            },
        },
        // */
    },

    scene: [
        LoadScene,
        StartScene,
        StageNumberScene,
        GameScene,
        ScoreScene,
        HiscoreScene,
        GameOverScene,
        TeamScene,
        PauseScene,
    ],
};

const game = new Phaser.Game(config);

const canvas = document.querySelector('canvas') as HTMLCanvasElement;

canvas.getContext('2d', {
    willReadFrequently: true,
});
