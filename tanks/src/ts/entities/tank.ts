import Entity from './entity';

class Tank extends Entity {
    private controller = 'keyboard';

    private moving = false;

    constructor(scene: Phaser.Scene, x: number, y: number, sideBad: boolean, type: string) {
        const key = sideBad ? 'tanksEnm' : 'tanksPlr';

        const spriteKey = sideBad ? 'enemy' : 'player_1';

        super(scene, x, y, 'tank', key, `${spriteKey}_${type}_1`);

        this.setData('type', 'tank');
        this.setData('sideBad', sideBad);

        this.anims.create({
            key: 'playerMain',
            frames: this.anims.generateFrameNames(key, { prefix: `${spriteKey}_${type}_`, start: 1, end: 2 }),
            repeat: 0,
        });
    }

    update() {
        if (this.moving) {
            this.direction %= 4;
            if (this.direction % 2 !== 0) {
                this.x += (this.direction - 2) * -3;
            } else {
                this.y += (this.direction - 1) * 3;
            }
            this.anims.play('playerMain', true);
        }
        this.angle = 90 * this.direction;
    }

    set dir(value: number) {
        this.direction = value % 4;
        this.update();
    }

    set move(value: boolean) {
        this.moving = value;
        this.update();
    }
}

export default Tank;
