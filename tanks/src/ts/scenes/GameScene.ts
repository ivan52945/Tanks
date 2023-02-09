import tanksPlayerImge from '../../assets/images/tanks-1.png';
import tanksPlayerJSON from '../../assets/images/tanks-1.json';

import tanksEnemyImge from '../../assets/images/tanks-2.png';
import tanksEnemyJSON from '../../assets/images/tanks-2.json';

import wallsIMGE from '../../assets/images/block-1.png';
import wallsJSON from '../../assets/images/block-1.json';

import block1 from '../../assets/images/block-1.png';
import tilemap1 from '../../assets/maps/tilemap1.json';

import shotImge from '../../assets/images/shot.png';

import rightBorder from '../../assets/images/right-border.png';
import borderBlock from '../../assets/images/border-block.png';

import shotSound from '../../assets/audio/sounds-fire.ogg';
import moveSound from '../../assets/audio/sounds-background.ogg';

import Tank from '../entities/base/tank';
import Player from '../entities/player';
import Enemy from '../entities/enemy';
import Shot from '../entities/base/shot';

import { Group, Keys } from '../interfaces/based';
import IBattleScene from '../interfaces/battle-scene';

class GameScene extends Phaser.Scene implements IBattleScene {
    private keyboard!: Keys;

    private player!: Player;

    private tanks!: Group;

    private shots!: Group;

    private sfx!: {
        moveSound: Phaser.Sound.BaseSound;
    };

    constructor() {
        super({ key: 'GameScene' });
    }

    preload() {
        this.load.atlas('tanksPlr', tanksPlayerImge, tanksPlayerJSON);
        this.load.atlas('tanksEnm', tanksEnemyImge, tanksEnemyJSON);

        this.load.atlas('walls', wallsIMGE, wallsJSON);
        this.load.image('walls1', wallsIMGE);

        this.load.image('tiles1', block1);
        this.load.tilemapTiledJSON('tilemap1', tilemap1);

        this.load.image('shotImge', shotImge);

        this.load.image('borderBlock', borderBlock);
        this.load.image('rightBorder', rightBorder);

        this.load.audio('shotSound', shotSound);
        this.load.audio('moveSound', moveSound);
    }

    /*
        костыль добавления группы + добавление столкновения
        в будущем нужно будет сделать добавление
    */
    addTank(tank: Tank) {
        this.tanks.add(tank);
        setTimeout(() => {
            tank.setPushable(false);
        }, 0);
    }

    addShot(shot: Shot) {
        this.shots.add(shot);
    }

    create() {
        /* когда будете смотреть демо, врубите консоль и попробуйте столкнуться с кирпичём */

        const map = this.make.tilemap({ key: 'tilemap1' });
        const tileset = map.addTilesetImage('tileSet1', 'tiles1');

        const walls = map.createLayer('walls-layer', tileset);

        walls.setCollisionByProperty({ collides: true });

        this.tanks = this.physics.add.group({ collideWorldBounds: true });
        this.shots = this.physics.add.group({ collideWorldBounds: true });

        this.keyboard = this.input.keyboard.createCursorKeys();

        this.player = new Player(this, 250, 250);

        this.addTank(this.player);
        this.addTank(new Enemy(this, 450, 450));
        this.addTank(new Enemy(this, 650, 450));

        const borders = this.physics.add.staticGroup();

        borders.create(960, 480, 'rightBorder', 'border');
        borders.create(32, 480, 'borderBlock', 'border').scaleY = 15;
        borders.create(480, 32, 'borderBlock', 'border').scaleX = 13;
        borders.create(480, 928, 'borderBlock', 'border').scaleX = 13;

        this.physics.add.collider(this.tanks, walls, (tank) => {
            tank.update();
        });

        this.physics.add.collider(this.tanks, this.tanks, (tank1, tank2) => {
            tank1.update();
            tank2.update();
        });

        this.physics.add.collider(this.shots, this.shots, (shot1, shot2) => {
            shot1.destroy();
            shot2.destroy();
        });
        this.physics.add.collider(this.shots, walls, (shot, wall) => {
            shot.destroy();
            wall.destroy();
        });

        this.physics.add.collider(this.shots, this.tanks, (shot, tank) => {
            const war = +(shot as Shot).sideBad + +(tank as Tank).sideBad;

            if (war % 2 !== 0) {
                if (tank instanceof Enemy) {
                    console.log('killed');
                } else {
                    console.log('Game Over');
                    this.player.HP = 0;
                }

                tank.destroy();
            }

            shot.destroy();
        });

        this.physics.add.collider(this.shots, borders, (shot) => {
            shot.destroy();
        });

        this.physics.add.collider(this.tanks, borders, (tank) => {
            tank.update();
        });

        this.sfx = {
            moveSound: this.sound.add('moveSound'),
        };
    }

    update() {
        if (this.player.HP > 0) {
            if (this.player.manual) {
                if (this.keyboard.left.isDown) {
                    this.player.move(3);
                    this.sfx.moveSound.play(); // звук движения
                } else if (this.keyboard.right.isDown) {
                    this.player.move(1);
                    this.sfx.moveSound.play();
                } else if (this.keyboard.down.isDown) {
                    this.player.move(2);
                    this.sfx.moveSound.play();
                } else if (this.keyboard.up.isDown) {
                    this.player.move(4);
                    this.sfx.moveSound.play();
                } else {
                    this.player.stopMove();
                }
                if (this.keyboard.space.isDown) {
                    // ------------------------------выстрел при нажатии пробела
                    this.player.shot();
                }
            }
        }
    }
}
export default GameScene;
