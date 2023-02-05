import logoImg from '../../assets/images/tanks-2.png';

class GameScene extends Phaser.Scene {
    keys: unknown;

    constructor() {
        super({
            key: 'GameScene',
        });
    }

    preload() {
        this.load.image('logo', logoImg);
    }

    create() {
        this.add.image(500, 320, 'logo');
    }

    update() {}
}
export default GameScene;
