import tanksPlayerImge from '../../assets/images/tanks-1.png';
import tanksPlayerJSON from '../../assets/images/tanks-1.json';

import tanksEnemyImge from '../../assets/images/tanks-2.png';
import tanksEnemyJSON from '../../assets/images/tanks-2.json';

import wallsIMGE from '../../assets/images/block-1.png';
import wallsJSON from '../../assets/images/block-1.json';

import Tank from '../entities/base/tank';
import Player from '../entities/player';
import Enemy from '../entities/enemy';
import ITank from '../interfaces/tank';

type Keys = Phaser.Types.Input.Keyboard.CursorKeys;
type Group = Phaser.Physics.Arcade.Group;
class GameScene extends Phaser.Scene {
    private keyboard!: Keys;

    private player!: Player;

    private tanks!: Group;

    private fulliedAI!: Group;

    // private bullets!:

    constructor() {
        super({ key: 'GameScene' });
    }

    preload() {
        this.load.atlas('tanksPlr', tanksPlayerImge, tanksPlayerJSON);
        this.load.atlas('tanksEnm', tanksEnemyImge, tanksEnemyJSON);

        this.load.atlas('walls', wallsIMGE, wallsJSON);
        this.load.image('walls1', wallsIMGE);
    }

    /*
        костыль добавления группы + добавление столкновения
        в будущем нужно будет сделать добавление
    */
    addTank(tank: Tank) {
        this.tanks.add(tank);
        this.fulliedAI.add(tank);
        setTimeout(() => {
            tank.setCollideWorldBounds(true);
        }, 0);
    }

    create() {
        /* когда будете смотреть демо, врубите консоль и попробуйте столкнуться с кирпичём */

        this.keyboard = this.input.keyboard.createCursorKeys();

        this.player = new Player(this, 250, 250);

        const bricks = this.physics.add.staticGroup();

        bricks.create(100, 100, 'walls', 'brick');

        this.tanks = this.physics.add.group();

        this.addTank(this.player);
        this.addTank(new Enemy(this, 450, 450));
        this.addTank(new Enemy(this, 650, 450));

        this.physics.add.collider(this.tanks, bricks, () => {
            console.log('collide');
        });

        this.physics.add.collider(this.tanks, this.tanks, (tank1: ITank, tank2: ITank) => {
            // tank1.setVelocity(0, 0);
            tank1.update();
            // tank1.x = tank1.x;
            // tank2.setVelocity(0, 0);
            tank2.update();
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
