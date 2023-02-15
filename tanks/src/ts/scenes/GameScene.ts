import tanksImge from '../../assets/images/tanks.png';
import tanksJSON from '../../assets/images/tanks.json';

import wallsIMGE from '../../assets/images/block-1.png';
import wallsJSON from '../../assets/images/block-1.json';

import block32 from '../../assets/images/blocks-32.png';
import tilemap1 from '../../assets/maps/tilemap1.json';

import shotImge from '../../assets/images/shot-small.png';

import tankInGameImg from '../../assets/images/mini-tank.png';

import rightBorder from '../../assets/images/right-border.png';
import borderBlock from '../../assets/images/border-block-32.png';

import explosion from '../../assets/images/small-explosion.png';
import bigExplosion from '../../assets/images/big-explosion.png';

import numbersIMGE from '../../assets/images/numbers.png';
import numbersJSON from '../../assets/images/numbers.json';

import gameOver from '../../assets/images/game-over.png';

import shotSound from '../../assets/audio/sounds-fire.ogg';
import moveSound from '../../assets/audio/sounds-background.ogg';
import explosionSound from '../../assets/audio/sounds-explosion.ogg';
import gameOverSound from '../../assets/audio/game-over.ogg';

import Tank from '../entities/base/tank';
import Player from '../entities/player';
import Shot from '../entities/base/shot';

import { Group, Keys } from '../interfaces/based';
import IBattleScene from '../interfaces/battle-scene';
import Fabric from '../modules/fabric';

import { Enemies } from '../modules/score-config';
import ITank from '../interfaces/tank';
import { fCos, fSin } from '../modules/functions';

class GameScene extends Phaser.Scene implements IBattleScene {
    private keyboard!: Keys;

    private player!: Player;

    private tanks!: Group;

    private shots!: Group;

    private life = 2;

    private stage = 1;

    private tanksInGame = new Array(20).fill(1);

    private score = [0, 0, 0, 0];

    constructor() {
        super({ key: 'GameScene' });
    }

    init(result: { stage: number }) {
        this.stage = result.stage || this.stage;
    }

    preload() {
        console.log(this.stage);

        this.load.image('tankInGameImg', tankInGameImg);

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

        this.load.atlas('numbers', numbersIMGE, numbersJSON);

        this.load.image('gameOver', gameOver);

        this.load.audio('shotSound', shotSound);
        this.load.audio('moveSound', moveSound);
        this.load.audio('explosionSound', explosionSound);
        this.load.audio('gameOverSound', gameOverSound);
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

    killScene() {
        this.tanks.destroy(true, true);
    }

    create() {
        this.events.removeListener('GameOver');
        this.events.removeListener('killed');

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
                { x: 650, y: 650 },
            ],
            plan: ['shooter', 'light', 'heavy'],
            // plan: ['light'],
        };

        const factory = new Fabric(this, fabricConfig);

        const borders = this.physics.add.staticGroup();

        borders.create(960, 480, 'rightBorder');
        borders.create(32, 480, 'borderBlock').setScale(2, 30).refreshBody();
        borders.create(480, 32, 'borderBlock').setScale(26, 2).refreshBody();
        borders.create(480, 928, 'borderBlock').setScale(26, 2).refreshBody();

        let miniTankX = 944;
        let miniTankY = 80;

        this.tanksInGame.forEach((el, i) => {
            // -----------------------------------------отрисовка танков в игре
            miniTankY += 32;
            if (i === 10) {
                miniTankX += 32;
                miniTankY = 112;
            }
            if (el === 1) {
                this.add.image(miniTankX, miniTankY, 'tankInGameImg');
            }
        });

        // let stageTen = '0';

        // this.add.image(944, 816, 'numbers', stageTen); // первая цифра уровня
        this.add.image(944, 816, 'borderBlock');
        this.add.image(976, 816, 'numbers', this.stage); // вторая цифра уровня

        this.add.image(976, 592, 'numbers', this.life);

        borders.create(964, 672, 'borderBlock').setScale(2, 2).refreshBody(); // закрывает второго игрока на панели

        const element = this.add.image(484, 1000, 'gameOver');

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

        this.physics.add.collider(this.shots, walls, (shot) => {
            this.add.sprite(shot.body.x, shot.body.y, 'explosion').play('explodeAnimation');
            this.sound.add('explosionSound').play();

            const { x, y, dir } = shot as Shot;

            const xT = x + fCos(dir) * 17;
            const yT = y + fSin(dir) * 17;

            walls.removeTileAtWorldXY(xT + fCos(dir + 1) * 8, yT + fSin(dir + 1) * 8);
            walls.removeTileAtWorldXY(xT + fCos(dir + 3) * 8, yT + fSin(dir + 3) * 8);

            shot.destroy();
        });

        this.physics.add.collider(this.shots, this.tanks, (shot, tank: unknown) => {
            if ((shot as Shot).sideBad !== (tank as ITank).sideBad) {
                (tank as ITank).getShot(shot as Shot);
            }
            this.add.image(976, 592, 'numbers', this.life); // --------------------меняет количество жизней на панели

            this.add.sprite(shot.body.x, shot.body.y, 'bigExplosion').play('bigExplodeAnimation');
            this.sound.add('explosionSound').play();

            shot.destroy();
        });

        // события убийства игрока и врагов

        this.events.on('killed', (type: Enemies) => {
            this.score[type] += 1;

            factory.produce();

            setTimeout(() => {
                if (this.tanks.getChildren().length <= 1) {
                    this.scene.start('ScoreScene', { stage: this.stage, score: this.score });
                }
            }, 1000);
        });

        this.events.on('GameOver', () => {
            this.life -= 1;
            if (this.life >= 0) {
                this.player = new Player(this, 250, 250);
                this.addTank(this.player);
            } else {
                this.tweens.add({
                    targets: element,
                    y: 450,
                    duration: 3000,
                    ease: 'Power3',
                });
                setTimeout(() => {
                    this.life = 2;
                    this.stage = 1;
                    this.sound.add('gameOverSound').play();
                    this.score = [0, 0, 0, 0];
                    this.scene.start('GameOverScene');
                }, 3000);
            }
        });

        this.physics.add.collider(this.shots, borders, (shot) => {
            shot.destroy();
        });

        this.physics.add.collider(this.tanks, borders, (tank) => {
            tank.update();
        });
    }

    update() {
        if (this.player.body) {
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
                if (this.keyboard.space.isDown) {
                    // ------------------------------выстрел при нажатии пробела
                    this.player.shot();
                }
            }
        }
    }

    getTanks() {
        return this.tanks;
    }
}
export default GameScene;
