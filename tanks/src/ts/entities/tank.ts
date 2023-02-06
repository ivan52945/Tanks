import TankAI from '../modules/TanksAI';
import Entity from './entity';
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
    public animation: Animation;

    private sideBad = true;

    private moving = false;

    private manual = false;

    readonly controller: TankAI;

    constructor(scene: Phaser.Scene, x: number, y: number, sideBad: boolean, type: string, manual = false) {
        const key = sideBad ? 'tanksEnm' : 'tanksPlr';

        const spriteKey = sideBad ? 'enemy' : 'player_1';

        super(scene, x, y, 'tank', key, `${spriteKey}_${type}_1`);

        this.controller = new TankAI(1, (direction) => {
            this.move(direction);
        });

        this.manual = manual;
        this.setData('sideBad', sideBad);
        this.sideBad = sideBad;

        console.log(scene.anims.exists(`${spriteKey}_${type}`));

        this.animation = scene.anims.create({
            key: `${spriteKey}_${type}`,
            frames: this.anims.generateFrameNames(key, { prefix: `${spriteKey}_${type}_`, start: 1, end: 2 }),
            repeat: -1,
        }) as Animation;
    }

    move(direction: number) {
        this.direction = direction % 4;

        if (this.direction % 2 !== 0) {
            this.setVelocity((this.direction - 2) * -240, 0);
        } else {
            this.setVelocity(0, (this.direction - 1) * 240);
        }

        if (!this.moving) {
            this.anims.play(this.animation, true);
            this.moving = true;
        }

        this.angle = 90 * this.direction;
    }

    stopMove() {
        this.anims.stop();
        this.setVelocity(0, 0);
        this.moving = false;
    }
}

export default Tank;
