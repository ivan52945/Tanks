import Phaser from 'phaser';
import logoImg from './assets/logo.png';

class MyGame extends Phaser.Scene {
    constructor() {
        super('Game');
    }

    preload() {
        this.load.image('logo', logoImg);
    }

    create() {
        const logo = this.add.image(600, 150, 'logo');

        this.tweens.add({
            targets: logo,
            y: 450,
            duration: 2000,
            ease: 'Power2',
            yoyo: true,
            loop: 1,
        });
    }
}
const windowInnerWidth = document.documentElement.clientWidth;
const windowInnerHeight = document.documentElement.clientHeight;

const config = {
    type: Phaser.AUTO,
    parent: 'app',
    width: windowInnerWidth - 20,
    height: windowInnerHeight - 20,
    scene: MyGame,
};

const game = new Phaser.Game(config);
