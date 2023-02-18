import tanksImge from '../../assets/images/tanks.png';
import tanksJSON from '../../assets/images/tanks.json';

import wallsIMGE from '../../assets/images/block-1.png';
import wallsJSON from '../../assets/images/block-1.json';

import block32 from '../../assets/images/blocks-32.png';
// import tilemap1 from '../../assets/maps/tilemap1.json'; // ---- чтобы поменять тайлмап, надо поменять "1" на "2" или "3"
import maps from '../modules/maps';

import shotImge from '../../assets/images/shot-small.png';

import tankInGameImg from '../../assets/images/mini-tank.png';

import rightBorder from '../../assets/images/right-border.png';
import borderBlock from '../../assets/images/border-block-32.png';

import explosion from '../../assets/images/small-explosion.png';
import bigExplosion from '../../assets/images/big-explosion.png';

import numbersIMGE from '../../assets/images/numbers.png';
import numbersJSON from '../../assets/images/numbers.json';

import pointsImg from '../../assets/images/points.png';

import starImg from '../../assets/images/star.png';

import protectionImg from '../../assets/images/protection.png';

import gameOver from '../../assets/images/game-over.png';

import shotSound from '../../assets/audio/sounds-fire.ogg';
import moveSound from '../../assets/audio/sounds-background.ogg';
import explosionSound from '../../assets/audio/sounds-explosion.ogg';
import steelSound from '../../assets/audio/sounds-steel.ogg';

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
import setFinderEmpty from '../modules/findFreeSpace';

class GameScene extends Phaser.Scene implements IBattleScene {
    private keyboard!: Keys;

    private player!: Player;

    private tanks!: Group;

    private shots!: Group;

    private life = 2;

    private stage = 1;

    private loaded = false;

    private tanksInGame = new Array(20).fill(1);

    constructor() {
        super({ key: 'GameScene' });
    }

    init(result: { stage: number }) {
        this.stage = result.stage || this.stage;
    }

    preload() {
        this.load.image('tankInGameImg', tankInGameImg);

        this.load.atlas('tanks', tanksImge, tanksJSON);

        this.load.atlas('walls', wallsIMGE, wallsJSON);
        this.load.image('walls1', wallsIMGE);

        this.load.image('tiles1', block32);

        if (!this.loaded) {
            maps.forEach((map, i) => {
                this.load.tilemapTiledJSON(`tilemap${i}`, map); // здесь тоже надо цифру менять
            });
            this.loaded = true;
        }

        this.load.image('shotImge', shotImge);

        this.load.image('borderBlock', borderBlock);
        this.load.image('rightBorder', rightBorder);

        this.load.spritesheet('explosion', explosion, { frameWidth: 62, frameHeight: 64, endFrame: 3 });
        this.load.spritesheet('bigExplosion', bigExplosion, { frameWidth: 127, frameHeight: 130, endFrame: 2 });

        this.load.atlas('numbers', numbersIMGE, numbersJSON);

        this.load.spritesheet('pointsImg', pointsImg, {
            frameWidth: 62,
            frameHeight: 28,
        });
        this.load.spritesheet('protectionImg', protectionImg, {
            frameWidth: 64,
            frameHeight: 64,
        });

        this.load.spritesheet('starImg', starImg, {
            frameWidth: 64,
            frameHeight: 60,
            endFrame: 3,
        });

        this.load.image('gameOver', gameOver);

        this.load.audio('shotSound', shotSound);
        this.load.audio('moveSound', moveSound);
        this.load.audio('explosionSound', explosionSound);
        this.load.audio('steelSound', steelSound);

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
        const score = [0, 0, 0, 0];

        const mapKeyNum = (this.stage - 1) % maps.length;

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

        const map = this.make.tilemap({ key: `tilemap${mapKeyNum}` }); // здесь надо менять цифру
        const tileset = map.addTilesetImage(`tileSet${mapKeyNum + 1}`, 'tiles1'); // здесь тоже, но tiles1 оставить в покое

        const walls = map.createLayer('walls-layer', tileset);
        const water = map.createLayer('water-layer', tileset);

        walls.setCollisionByProperty({ collides: true });
        water.setCollisionByProperty({ collides: true });

        const find = setFinderEmpty(map);

        this.anims.create({
            key: 'protectionImgAnimation',
            frames: this.anims.generateFrameNumbers('protectionImg', { start: 0, end: 1, first: 0 }),
            frameRate: 20,
            repeat: -1,
        });

        this.anims.create({
            key: 'starImgAnimation',
            frames: this.anims.generateFrameNumbers('starImg', { start: 0, end: 3, first: 0 }),
            frameRate: 20,
            repeat: 4,
        });

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

        let factory: { produce: () => void };

        setTimeout(() => {
            factory = new Fabric(this, fabricConfig);
        }, 1000);

        const borders = this.physics.add.staticGroup();

        borders.create(960, 480, 'rightBorder');
        borders.create(32, 480, 'borderBlock').setScale(2, 30).refreshBody();
        borders.create(480, 32, 'borderBlock').setScale(26, 2).refreshBody();
        borders.create(480, 928, 'borderBlock').setScale(26, 2).refreshBody();

        this.changeTankIsGame(); // ---------------------отрисовывает танки в игре

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

        this.physics.add.collider(this.tanks, water, (tank) => {
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
            const { x, y, dir } = shot as Shot;

            const exploze = this.add.sprite(x, y, 'explosion');

            setTimeout(() => {
                exploze.destroy();
            }, 300.00000000001);
            this.sound.add('explosionSound').play();
            exploze.play('explodeAnimation');

            const xT = x + fCos(dir) * 17;
            const yT = y + fSin(dir) * 17;

            walls.removeTileAtWorldXY(xT + fCos(dir + 1) * 8, yT + fSin(dir + 1) * 8);
            walls.removeTileAtWorldXY(xT + fCos(dir + 3) * 8, yT + fSin(dir + 3) * 8);

            shot.destroy();

            setTimeout(() => {
                exploze.destroy();
            }, 300);
        });

        this.physics.add.collider(this.shots, this.tanks, (shot, tank: unknown) => {
            if ((shot as Shot).sideBad !== (tank as ITank).sideBad) {
                (tank as ITank).getShot(shot as Shot);
            }

            const exploze = this.add.sprite(shot.body.x, shot.body.y, 'bigExplosion');

            setTimeout(() => {
                exploze.destroy();
            }, 300.00000000001);
            this.sound.add('explosionSound').play();
            exploze.play('bigExplodeAnimation');

            shot.destroy();
        });

        // события убийства игрока и врагов
        let counterDestroyTanks = 1;
        let killed = 0;
        this.events.on('killed', (type: Enemies, x: number, y: number) => {
            score[type] += 1;
            killed += 1;

            // if (this.tanks.getChildren().length > 2) {
            if (killed === 3) {
                // ---------------------------число равное количеству подбитых танков, что бы для спавна оставалось только 2() если спавнится 5, число 3
                factory.produce();
            }

            setTimeout(() => {
                if (this.tanks.getChildren().length <= 1 && this.life >= 0) {
                    this.scene.start('ScoreScene', { stage: this.stage, score });
                }
            }, 1000);

            this.tanksInGame[this.tanksInGame.length - counterDestroyTanks] = 0;
            counterDestroyTanks += 1;
            this.changeTankIsGame();

            const points = this.add.sprite(x, y, 'pointsImg').setFrame(type);
            setTimeout(() => {
                points.destroy();
            }, 1000);
        });

        this.events.on('GameOver', () => {
            this.life -= 1;
            this.add.image(976, 592, 'numbers', this.life); // --------------------меняет количество жизней на панели
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
                    this.sound.add('gameOverSound').play();
                    this.stage = 1;
                    this.scene.start('GameOverScene');
                }, 3000);
            }
        });

        this.physics.add.collider(this.shots, borders, (shot) => {
            shot.destroy();
            this.sound.add('steelSound').play();
        });

        this.physics.add.collider(this.tanks, borders, (tank) => {
            tank.update();
        });

        this.events.once('shutdown', () => {
            this.events.removeAllListeners('killed');
            this.events.removeAllListeners('getBonus');
            this.events.removeAllListeners('GameOver');
        });
    }

    changeTankIsGame() {
        let miniTankX = 944;
        let miniTankY = 80;

        this.tanksInGame.forEach((el, i) => {
            // -----------------------------------------отрисовка на панели количество танков в игре
            miniTankY += 32;
            if (i === 10) {
                miniTankX += 32;
                miniTankY = 112;
            }
            if (el === 1) {
                this.add.image(miniTankX, miniTankY, 'tankInGameImg');
            } else {
                this.add.image(miniTankX, miniTankY, 'borderBlock');
            }
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
