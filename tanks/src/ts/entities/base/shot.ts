import { fCos, fSin } from '../../modules/functions';

import IBattleScene from '../../interfaces/battle-scene';
import Entity from './entity';

class Shot extends Entity {
    readonly sideBad: boolean;

    readonly dir: number;

    constructor(scene: IBattleScene, x: number, y: number, dir: number, sideBad: boolean) {
        super(scene, x, y, 'shot', 'shotImge');

        scene.addShot(this);
        // this.setScale(0.5, 0.75);
        this.dir = dir;
        this.sideBad = sideBad;

        this.setVelocity(fCos(this.dir) * 400, fSin(this.dir) * 400);

        this.angle = 90 * this.dir;
    }
}

export default Shot;
