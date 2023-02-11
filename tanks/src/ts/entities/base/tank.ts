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

    public HP = 3;

    protected speed = 120;

    protected shotSpeedMod = 1;

    private animation: Animation;

    protected controller!: IController;

    protected readyToUpdate = true;

    readonly sideBad: boolean;

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

        this.animation = scene.anims.create({
            key: `${spriteKey}_${type}`,
            frames: this.anims.generateFrameNames('tanks', { prefix: `${spriteKey}_${type}_`, start: 1, end: 2 }),
            repeat: -1,
        }) as Animation;
    }

    move(dir: number) {
        this.dir = dir % 4;

        this.setVelocityX(fCos(this.dir) * this.speed);
        this.setVelocityY(fSin(this.dir) * this.speed);

        if (!this.moving) {
            this.anims.play(this.animation, true);
            this.moving = true;
        }

        this.angle = 90 * this.dir;
    }

    stopMove() {
        this.anims.stop();
        this.setVelocity(0, 0);
        this.moving = false;
    }

    shot() {
        if (!this.readyShot) return;

        this.readyShot = false;

        setTimeout(() => {
            this.readyShot = true;
        }, this.coolDown * 1000);

        const xShot = this.x + fCos(this.dir) * 30;
        const yShot = this.y + fSin(this.dir) * 30;

        // eslint-disable-next-line no-new
        new Shot(this.scene as IBattleScene, xShot, yShot, this.dir, this.sideBad, this.shotSpeedMod);
    }

    update() {
        if (!this.readyToUpdate) return;

        setTimeout(() => {
            this.readyToUpdate = true;
        }, 200);
        this.readyToUpdate = false;
        this.move(randIntFrZ(3));
    }
}

export default Tank;
