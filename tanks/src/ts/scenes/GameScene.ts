import tanksImge from '../../assets/images/tanks.png';
import tanksJSON from '../../assets/images/tanks.json';

import wallsIMGE from '../../assets/images/block-1.png';
import wallsJSON from '../../assets/images/block-1.json';

import block32 from '../../assets/images/blocks-32.png';
import tilemap1 from '../../assets/maps/tilemap1.json';

import shotImge from '../../assets/images/shot-small.png';

import rightBorder from '../../assets/images/right-border.png';
import borderBlock from '../../assets/images/border-block-32.png';

import explosion from '../../assets/images/small-explosion.png';
import bigExplosion from '../../assets/images/big-explosion.png';

import shotSound from '../../assets/audio/sounds-fire.ogg';
import moveSound from '../../assets/audio/sounds-background.ogg';

import Tank from '../entities/base/tank';
import Player from '../entities/player';
import Shot from '../entities/base/shot';

import { Group, Keys } from '../interfaces/based';
import IBattleScene from '../interfaces/battle-scene';
import Fabric from '../modules/fabric';
import ITank from '../interfaces/tank';
import { fCos, fSin } from '../modules/functions';

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
        this.load.atlas('tanks', tanksImge, tanksJSON);

        this.load.atlas('walls', wallsIMGE, wallsJSON);
        this.load.image('walls1', wallsIMGE);

        this.load.image('tiles1', block32);
        this.load.tilemapTiledJSON('tilemap1', tilemap1);

        this.load.image('shotImge', shotImge);

        this.load.image('borderBlock', borderBlock);
        this.load.image('rightBorder', rightBorder);

        this.load.spritesheet('explosion', explosion, { frameWidth: 62, frameHeight: 64, endFrame: 3 });
        this.load.spritesheet('bigExplosion', bigExplosion, { frameWidth: 127, frameHeight: 130, endFrame: 2 });

        this.load.audio('shotSound', shotSound);
        this.load.audio('moveSound', moveSound);
    }

    /*
        функция полезная

        можно и оставить
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
        this.anims.create({
            key: 'explodeAnimation',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 3, first: 0 }),
            frameRate: 10,
            repeat: 0,
        });
        this.anims.create({
            key: 'bigExplodeAnimation',
            frames: this.anims.generateFrameNumbers('bigExplosion', { start: 0, end: 2, first: 0 }),
            frameRate: 10,
            repeat: 0,
        });

        const map = this.make.tilemap({ key: 'tilemap1' });
        const tileset = map.addTilesetImage('tileSet1', 'tiles1');

        const walls = map.createLayer('walls-layer', tileset);

        walls.setCollisionByProperty({ collides: true });

        this.tanks = this.physics.add.group();
        this.shots = this.physics.add.group();

        this.keyboard = this.input.keyboard.createCursorKeys();

        this.player = new Player(this, 250, 250);

        this.addTank(this.player);

        const fabricConfig = {
            coords: [
                { x: 450, y: 450 },
                // { x: 650, y: 650 },
            ],
            plan: ['whelled', 'light', 'shooter', 'heavy'],
        };

        const fabric = new Fabric(this, fabricConfig);

        const borders = this.physics.add.staticGroup();

        borders.create(960, 480, 'rightBorder');
        borders.create(32, 480, 'borderBlock').setScale(2, 30).refreshBody();
        borders.create(480, 32, 'borderBlock').setScale(26, 2).refreshBody();
        borders.create(480, 928, 'borderBlock').setScale(26, 2).refreshBody();

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
            this.add.sprite(shot.body.x, shot.body.y, 'explosion').play('explodeAnimation');

            const { x, y, dir } = shot as Shot;

            const xT = x + fCos(dir) * 17;
            const yT = y + fSin(dir) * 17;

            walls.removeTileAtWorldXY(xT + fCos(dir + 1) * 8, yT + fSin(dir + 1) * 8);
            walls.removeTileAtWorldXY(xT + fCos(dir + 3) * 8, yT + fSin(dir + 3) * 8);

            /*
            switch ((shot as Shot).dir) {
                case 0:
                    walls.removeTileAtWorldXY((shot as Shot).x + 17, (shot as Shot).y - 25);
                    walls.removeTileAtWorldXY((shot as Shot).x - 17, (shot as Shot).y - 25);
                    break;
                case 1:
                    walls.removeTileAtWorldXY((shot as Shot).x + 25, (shot as Shot).y + 17);
                    walls.removeTileAtWorldXY((shot as Shot).x + 25, (shot as Shot).y - 17);
                    break;
                case 2:
                    walls.removeTileAtWorldXY((shot as Shot).x + 17, (shot as Shot).y + 25);
                    walls.removeTileAtWorldXY((shot as Shot).x - 17, (shot as Shot).y + 25);
                    break;
                case 3:
                    walls.removeTileAtWorldXY((shot as Shot).x - 25, (shot as Shot).y + 17);
                    walls.removeTileAtWorldXY((shot as Shot).x - 25, (shot as Shot).y - 17);
                    break;
                default:
                    console.log('oops');
            }
            */
            shot.destroy();
        });

        this.physics.add.collider(this.shots, this.tanks, (shot, tank: unknown) => {
            if ((shot as Shot).sideBad !== (tank as ITank).sideBad) {
                (tank as ITank).getShot(shot as Shot);
            }
            this.add.sprite(shot.body.x, shot.body.y, 'bigExplosion').play('bigExplodeAnimation');
            shot.destroy();
        });

        // события убийства игрока и врагов

        this.events.on('killed', () => {
            fabric.produce();

            if (this.tanks.countActive(true) <= 0) {
                console.log('win');
            }
        });

        this.events.on('GameOver', () => {
            console.log('GameOver');
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
        this.input.keyboard.on('keydown', (event: { key: string }) => {
            if (event.key === 'p') {
                // ------- Инструмент разработчика. Переключатель сцен на англ. 'p'
                this.scene.start('HiscoreScene');
            }
        });
    }

    update() {
        if (this.player.body) {
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
