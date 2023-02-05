import logoImg from '../../assets/images/battle-city.png';
import tanksPlayerImge from '../../assets/images/tanks-1.png';
import tanksPlayerJSON from '../../assets/images/tanks-1.json';
import tanksEnemyImge from '../../assets/images/tanks-2.png';
import tanksEnemyJSON from '../../assets/images/tanks-2.json';
import Tank from '../entities/tank';

type Keys = Phaser.Types.Input.Keyboard.CursorKeys;
type Entity = Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

class GameScene extends Phaser.Scene {
    private keyboard!: Keys;

    private player!: Tank;

    constructor() {
        super({ key: 'GameScene' });
    }

    preload() {
        this.load.image('logo', logoImg);
        this.load.atlas('tanksPlr', tanksPlayerImge, tanksPlayerJSON);
        this.load.atlas('tanksEnm', tanksEnemyImge, tanksEnemyJSON);
    }

    create() {
        this.keyboard = this.input.keyboard.createCursorKeys();

        this.player = new Tank(this, 250, 250, false, 'main');

        // const player1 = this.physics.add.sprite(100, 100, 'tanksPlr', 'player_2_main_1');
    }

    update() {
        if (this.keyboard.left.isDown) {
            this.player.dir = 3;
            this.player.move = true;
        } else if (this.keyboard.right.isDown) {
            this.player.dir = 1;
            this.player.move = true;
        } else if (this.keyboard.down.isDown) {
            this.player.dir = 2;
            this.player.move = true;
        } else if (this.keyboard.up.isDown) {
            this.player.dir = 4;
            this.player.move = true;
        } else {
            this.player.move = false;
        }
    }
}
export default GameScene;
