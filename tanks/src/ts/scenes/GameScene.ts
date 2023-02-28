import tanksImge from '../../assets/images/tanks.png';
import tanksJSON from '../../assets/images/tanks.json';

import wallsIMGE from '../../assets/images/block-1.png';
import wallsJSON from '../../assets/images/block-1.json';

import bonusIMGE from '../../assets/images/bonus.png';
import bonusJSON from '../../assets/images/bonus.json';

import block32 from '../../assets/images/blocks-32.png';
import maps from '../modules/maps';

import planJson from '../../assets/plan.json';

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

import flagOnImg from '../../assets/images/flag-on.png';
import flagOffImg from '../../assets/images/flag-off.png';

import gameOver from '../../assets/images/game-over.png';

import shotSound from '../../assets/audio/sounds-fire.ogg';
import moveSound from '../../assets/audio/sounds-background.ogg';
import explosionSound from '../../assets/audio/sounds-explosion.ogg';
import steelSound from '../../assets/audio/sounds-steel.ogg';

import gameOverSound from '../../assets/audio/game-over.ogg';

import Tank from '../entities/base/tank';
import Player from '../entities/player';
import Shot from '../entities/base/shot';

import { Group, Keys, Static } from '../interfaces/based';
import IBattleScene from '../interfaces/battle-scene';
import Fabric from '../modules/fabric';

import { Enemies } from '../modules/score-config';
import ITank from '../interfaces/tank';
import { fCos, fSin, randIntFrZ } from '../modules/functions';
import setFinderEmpty from '../modules/find-free-space';
import findSpawns from '../modules/find-spawns';
import Bonus from '../interfaces/bonuses';

class GameScene extends Phaser.Scene implements IBattleScene {
    private keyboard!: Keys;

    private player!: Player;

    private tanks!: Group;

    private shots!: Group;

    private flag!: Static;

    private life = 2;

    private stage = 1;

    private level = 0;

    private loaded = false;

    private tanksInGame!: number[];

    timers: Phaser.Time.TimerEvent[] = [];

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
                this.load.tilemapTiledJSON(`tilemap${i}`, map);
            });
            this.loaded = true;
        }

        this.load.image('shotImge', shotImge);

        this.load.image('flagOnImg', flagOnImg);
        this.load.image('flagOffImg', flagOffImg);

        this.load.image('borderBlock', borderBlock);
        this.load.image('rightBorder', rightBorder);

        this.load.spritesheet('explosion', explosion, { frameWidth: 62, frameHeight: 64, endFrame: 3 });
        this.load.spritesheet('bigExplosion', bigExplosion, { frameWidth: 127, frameHeight: 130, endFrame: 2 });

        this.load.atlas('numbers', numbersIMGE, numbersJSON);
        this.load.atlas('bonuses', bonusIMGE, bonusJSON);

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

    addTimer(timerID: Phaser.Time.TimerEvent) {
        this.timers.push(timerID);
    }

    create() {
        const delayerBind = this.time.delayedCall.bind(this.time);
        const delayer = (callback: () => void, delay: number) => {
            delayerBind(delay, callback);
        };

        const score = {
            tanks: [0, 0, 0, 0],
            add: 0,
        };

        const mapKeyNum = (this.stage - 1) % maps.length;

        this.tanksInGame = new Array(planJson.plans[this.stage - 1].plan.length + 3).fill(1);

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

        const map = this.make.tilemap({ key: `tilemap${mapKeyNum}` });
        const tileset = map.addTilesetImage(`tileSet${mapKeyNum + 1}`, 'tiles1');

        const walls = map.createLayer('walls-layer', tileset);
        const water = map.createLayer('water-layer', tileset);
        const bushes = map.createLayer('bushes-layer', tileset);

        bushes.setDepth(10);

        walls.setCollisionByProperty({ collides: true });
        water.setCollisionByProperty({ collides: true });

        const result = findSpawns(maps[mapKeyNum], 0);
        const find = setFinderEmpty(maps[mapKeyNum]);

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
        const bonuses = this.physics.add.staticGroup();

        this.keyboard = this.input.keyboard.createCursorKeys();

        this.player = new Player(this, 352, 870);

        this.addTank(this.player);

        const fabricConfig = {
            coords: result,
            plan: planJson.plans[this.stage - 1].plan.slice(),
        };

        const factory = new Fabric(this, fabricConfig);

        const borders = this.physics.add.staticGroup();

        borders.create(960, 480, 'rightBorder');
        borders.create(32, 480, 'borderBlock').setScale(2, 30).refreshBody();
        borders.create(480, 32, 'borderBlock').setScale(26, 2).refreshBody();
        borders.create(480, 928, 'borderBlock').setScale(26, 2).refreshBody();

        this.flag = this.physics.add.staticSprite(480, 864, 'flagOnImg');

        this.changeTankIsGame(); // ---------------------отрисовывает танки в игре

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

        this.physics.add.collider(this.tanks, this.flag, (tank) => {
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

            (shot as Shot).explozion();

            const xT = x + fCos(dir) * 17;
            const yT = y + fSin(dir) * 17;

            const AOE = [dir + 1, dir + 3];

            AOE.forEach((dirAOE) => {
                const tile = walls.getTileAtWorldXY(xT + fCos(dirAOE) * 8, yT + fSin(dirAOE) * 8);

                if (!tile || (tile.index === 1 && (shot as Shot).durability < 2)) return;

                walls.removeTileAtWorldXY(xT + fCos(dirAOE) * 8, yT + fSin(dirAOE) * 8);
            });
            shot.destroy();
        });

        this.physics.add.collider(this.shots, this.tanks, (shot, tank: unknown) => {
            shot.destroy();

            (tank as Tank).explozion();

            if ((shot as Shot).sideBad !== (tank as ITank).sideBad) {
                (tank as ITank).getShot(shot as Shot);
            }
        });

        this.physics.add.collider(this.shots, this.flag, (_, shot) => {
            (shot as Shot).explozion();

            shot.destroy();
            this.flag.setTexture('flagOffImg');
            this.events.emit('GameOver');
        });

        // события убийства игрока и врагов

        let counterDestroyTanks = 1;

        this.events.on('killed', () => {
            setTimeout(() => factory.replanish(this.tanks.getLength() - 1), 0);

            delayer(() => {
                if (this.tanks.getChildren().length + factory.planSize <= 1 && this.life >= 0) {
                    this.scene.start('ScoreScene', { stage: this.stage, score });
                }
            }, 1000);
        });

        this.events.on('count', (type: Enemies, x: number, y: number) => {
            score.tanks[type] += 1;

            this.tanksInGame[this.tanksInGame.length - counterDestroyTanks] = 0;
            counterDestroyTanks += 1;
            this.changeTankIsGame();

            const points = this.add.sprite(x, y, 'pointsImg').setFrame(type);
            delayer(() => points.destroy(), 1000);
        });

        this.events.on('getBonuses', () => {
            const { x, y } = find();
            const numB = randIntFrZ(5);
            const bonus = bonuses.create(x, y, 'bonuses', `bonus_${numB}`);
            bonus.setData('bonus', numB);
            delayer(() => bonus.destroy(), 8000);
        });

        this.events.on('PlayerDead', () => {
            this.life -= 1;
            this.add.image(976, 592, 'numbers', this.life); // --------------------меняет количество жизней на панели
            if (this.life >= 0 && this.flag.body) {
                this.player = new Player(this, 352, 870);
                this.addTank(this.player);
            } else {
                this.events.emit('GameOver');
            }
        });

        this.events.on('GameOver', () => {
            this.events.removeListener('GameOver');
            this.tweens.add({
                targets: element,
                y: 450,
                duration: 3000,
                ease: 'Power3',
            });
            delayer(() => {
                this.life = 2;
                this.stage = 1;
                this.sound.add('gameOverSound').play();
                this.level = 0;
                this.scene.start('GameOverScene');
            }, 3000);
        });

        this.physics.add.collider(this.shots, borders, (shot) => {
            shot.destroy();
            this.sound.add('steelSound').play();
        });

        this.physics.add.collider(this.tanks, borders, (tank) => {
            tank.update();
        });

        this.physics.add.overlap(this.tanks, bonuses, (player, bonusBody) => {
            if (!(player instanceof Player)) return;

            const bonus = bonusBody.getData('bonus');

            bonusBody.destroy();

            if (bonus === Bonus.addLife) {
                this.life += 1;
                this.add.image(976, 592, 'numbers', this.life);
            } else if (bonus === Bonus.levelUp) {
                this.player.levelUp();
                this.level += 1;
            } else if (bonus === Bonus.protection) this.player.setProtection();
            else if (bonus === Bonus.grenade) {
                const tanks = this.tanks.getChildren().slice() as Tank[];

                tanks.forEach((tank) => {
                    if (tank instanceof Player) return;

                    tank.explozion();
                    (tank as Tank).lastChanse();
                    tank.destroy();
                });
                if (factory.planSize > 0) {
                    setTimeout(() => factory.replanish(this.tanks.getLength() - 1), 0);
                } else {
                    delayer(() => {
                        if (this.tanks.getChildren().length <= 1 && this.life >= 0) {
                            this.scene.start('ScoreScene', { stage: this.stage, score });
                        }
                    }, 1000);
                }
            } else if (bonus === Bonus.freeze) {
                const tanks = this.tanks.getChildren().slice() as Tank[];
                tanks.forEach((tank) => tank.freeze());
            } else if (bonus === Bonus.blockBase) {
                const distO = (p: number, o: number) => Math.abs(p - o + 80);
                const base = walls.culledTiles.filter(
                    (t) => distO(t.pixelX, this.flag.x) <= 80 && distO(t.pixelY, this.flag.y) <= 80 // Math.abs(t.pixelX + 80 - this.flag.x)  Math.abs(t.pixelY + 80 - this.flag.y) < 96
                );
                base.forEach((t) => {
                    t.index = 1;
                });
                delayer(() => {
                    base.forEach((t) => {
                        t.index = 8;
                    });
                }, 5000);
            }
        });

        this.events.once('shutdown', () => {
            this.input.keyboard.shutdown();
            const removeListener = this.events.removeAllListeners.bind(this.events);
            this.tanks.destroy(true, true);

            removeListener('count');
            removeListener('getBonuses');
            removeListener('killed');
            removeListener('PlayerDead');
            removeListener('GameOver');
        });
        // -------------------------------------------------------------------------pause
        this.input.keyboard.on('keydown', (event: { key: string }) => {
            if (event.key === 'p') {
                this.scene.pause('GameScene');
                this.scene.launch('PauseScene');
            }
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
