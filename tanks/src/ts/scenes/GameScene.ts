import tanksPlayerImge from '../../assets/images/tanks-1.png';
import tanksPlayerJSON from '../../assets/images/tanks-1.json';

import tanksEnemyImge from '../../assets/images/tanks-2.png';
import tanksEnemyJSON from '../../assets/images/tanks-2.json';

import wallsIMGE from '../../assets/images/block-1.png';
import wallsJSON from '../../assets/images/block-1.json';

import Tank from '../entities/base/tank';
import Player from '../entities/player';
import Enemy from '../entities/enemy';

type Keys = Phaser.Types.Input.Keyboard.CursorKeys;
type Group = Phaser.Physics.Arcade.Group;
class GameScene extends Phaser.Scene {
    private keyboard!: Keys;

    private player!: Player;

    private enemies!: Group;

    constructor() {
        super({ key: 'GameScene' });
    }

    preload() {
        this.load.atlas('tanksPlr', tanksPlayerImge, tanksPlayerJSON);
        this.load.atlas('tanksEnm', tanksEnemyImge, tanksEnemyJSON);

        this.load.atlas('walls', wallsIMGE, wallsJSON);
        this.load.image('walls1', wallsIMGE);
    }

    create() {
        /* когда будете смотреть демо, врубите консоль и попробуйте столкнуться с кирпичём */

        this.keyboard = this.input.keyboard.createCursorKeys();

        this.player = new Player(this, 250, 250);

        const enemy = new Enemy(this, 450, 450);
        const enemy1 = new Enemy(this, 650, 650);

        const bricks = this.physics.add.staticGroup();

        bricks.create(100, 100, 'walls', 'brick');

        const allies = this.physics.add.group();
        this.enemies = this.physics.add.group();

        allies.add(this.player);
        this.enemies.add(enemy);
        this.enemies.add(enemy1);

        // console.log(enemy1.animation.key === enemy.animation.key);

        // this.player.setCollideWorldBounds(true); not working

        this.physics.add.collider(allies, bricks, () => {
            console.log('collide');
        });
        this.physics.add.collider(allies, this.enemies, (tank1, tank2) => {
            (tank1 as Tank).setVelocity(0, 0);
            // tank1.x = tank1.x;
            (tank2 as Tank).setVelocity(0, 0);
        });
    }

    update() {
        // this.enemies.getChildren().forEach((e) => (e as Tank).controller.update());
        if (this.player.manual) {
            if (this.keyboard.left.isDown) {
                this.player.move(3);
            } else if (this.keyboard.right.isDown) {
                this.player.move(1);
            } else if (this.keyboard.down.isDown) {
                this.player.move(2);
            } else if (this.keyboard.up.isDown) {
                this.player.move(4);
            } else {
                this.player.stopMove();
            }
        }
    }
}
export default GameScene;
