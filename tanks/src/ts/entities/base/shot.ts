import { fCos, fSin } from '../../modules/functions';

import IBattleScene from '../../interfaces/battle-scene';
import Entity from './entity';

class Shot extends Entity {
    readonly sideBad: boolean;

    readonly dir: number;

    readonly durability: number;

    constructor(scene: IBattleScene, x: number, y: number, dir: number, sideBad: boolean, speed = 1, durability = 2) {
        super(scene, x, y, 'shot', 'shotImge');

        this.dir = dir;
        this.sideBad = sideBad;
        scene.addShot(this);

        speed *= 600;

        this.setVelocity(fCos(this.dir) * speed, fSin(this.dir) * speed);
        this.durability = durability;

        this.angle = 90 * this.dir;
    }

    explozion() {
        super.explozion('e');
    }
}

export default Shot;
