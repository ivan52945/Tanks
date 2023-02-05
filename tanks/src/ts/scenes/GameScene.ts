import logoImg from '../../assets/images/battle-city.png';

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
