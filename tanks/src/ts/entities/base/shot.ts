import IBattleScene from '../../interfaces/battle-scene';
import Entity from './entity';

class Shot extends Entity {
    readonly sideBad: boolean;
    readonly direction: number;

    constructor(scene: IBattleScene, x: number, y: number, direction: number, sideBad: boolean) {
        super(scene, x, y, 'shot', 'shotImge');

        scene.addShot(this);
        // this.setScale(0.5, 0.75);
        this.direction = direction;
        this.sideBad = sideBad;

        if (this.direction % 2 !== 0) {
            this.setVelocity((this.direction - 2) * -360, 0);
        } else {
            this.setVelocity(0, (this.direction - 1) * 360);
        }

        this.angle = 90 * this.direction;
    }
}

export default Shot;
