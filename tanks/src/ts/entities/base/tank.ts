import IBattleScene from '../../interfaces/battle-scene';
import Entity from './entity';
import Shot from './shot';
import { fSin, fCos, randIntFrZ } from '../../modules/functions';
import IController from '../../interfaces/controller';
/**
 * Class for all tanks. Can be used for making NPC tanks
 *
 * @param {Phaser.Scene} scene scene
 * @param {number} x x of position
 * @param {number} y y of position
 * @param {boolean} sideBad is it a bad boy?
 * @param {string} type  type of tank. can be main up1...up7
 *
 * @return {Tank} tank width phisix
 */

type Animation = Phaser.Animations.Animation;

class Tank extends Entity {
    protected readyShot = true;

    protected coolDown = 2;

    public HP = 2;

    protected speed = 120;

    protected shotSpeedMod = 1;

    protected shotQuantity = 1;

    protected animField: Animation;

    protected blinkTimer!: NodeJS.Timer | null;

    protected key: string;

    protected controller!: IController;

    protected readyToUpdate = true;

    readonly sideBad: boolean;

    protected shotDurab = 1;

    public moving = false;

    constructor(scene: IBattleScene, x: number, y: number, sideBad: boolean, type: string, player = false) {
        let spriteKey = ``;

        if (!sideBad) {
            if (!player) {
                spriteKey = 'player_2';
            } else {
                spriteKey = 'player_1';
            }
        } else {
            spriteKey = 'enemy';
        }

        super(scene, x, y, 'tank', 'tanks', `${spriteKey}_${type}_1`);

        this.sideBad = sideBad;
        this.key = `${spriteKey}_${type}`;
        this.animField = scene.anims.create({
            key: this.key,
            frames: this.anims.generateFrameNames('tanks', { prefix: `${this.key}_`, start: 1, end: 2 }),
            repeat: -1,
        }) as Animation;

        if (!sideBad) return;

        scene.anims.create({
            key: `${this.key}_bonus`,
            frames: this.anims.generateFrameNames('tanks', { prefix: `${this.key}_bonus_`, start: 1, end: 2 }),
            repeat: -1,
        }) as Animation;
    }

    move(dir: number) {
        this.dir = dir % 4;

        this.setVelocityX(fCos(this.dir) * this.speed);
        this.setVelocityY(fSin(this.dir) * this.speed);
        this.scene.sound.add('moveSound').play();

        if (!this.moving) {
            this.anims.play(this.animField, true);
            this.moving = true;
        }

        this.angle = 90 * this.dir;
    }

    stopMove() {
        this.setVelocity(0, 0);
        this.moving = false;
    }

    shot() {
        if (!this.readyShot) return;

        this.readyShot = false;

        setTimeout(() => {
            this.readyShot = true;
        }, this.coolDown * 1000);

        for (let i = 0; i < this.shotQuantity; i += 1) {
            setTimeout(() => {
                const xShot = this.x + fCos(this.dir) * 30;
                const yShot = this.y + fSin(this.dir) * 30;
                // eslint-disable-next-line no-new
                new Shot(
                    this.scene as IBattleScene,
                    xShot,
                    yShot,
                    this.dir,
                    this.sideBad,
                    this.shotSpeedMod,
                    this.shotDurab
                );
                this.scene.sound.add('shotSound').play();
            }, i * 100);
        }
    }

    update() {
        if (!this.readyToUpdate) return;

        setTimeout(() => {
            this.readyToUpdate = true;
        }, 200);
        this.readyToUpdate = false;
        this.move(randIntFrZ(3));
    }

    lastChanse() {}

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getShot(shot: Shot) {
        this.HP -= 1;

        if (this.getData('bonus')) {
            this.scene.events.emit('getBonus');
        }

        setTimeout(() => {
            this.stopBlinking();
        }, 0);

        if (this.HP > 0) return;

        this.lastChanse();
        this.destroy();
    }

    startBlink(adding: string) {
        let keyCurrent = `${this.key}_${adding}`;

        if (!this.scene.anims.exists(keyCurrent)) return;

        let frame = true;

        this.blinkTimer = setInterval(() => {
            frame = !frame;

            keyCurrent = frame ? this.key : `${this.key}_${adding}`;

            this.anims.play(keyCurrent);
        }, 200);

        setTimeout(() => {
            this.stopBlinking();
        }, 8000);
    }

    stopBlinking() {
        if (!this.blinkTimer) return;

        clearInterval(this.blinkTimer);

        this.blinkTimer = null;

        this.anims?.play(this.animField);
    }

    destroy() {
        super.destroy();
        this.controller.destroy();
        this.stopBlinking();
    }

    kill() {
        this.destroy();
    }

    set animSet(newKey: string) {
        this.key = newKey;

        this.animField = this.scene.anims.get(this.key);

        this.anims.play(this.animField);
    }
}

export default Tank;
