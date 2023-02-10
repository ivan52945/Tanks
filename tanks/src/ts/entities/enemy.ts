import randIntFrZ from '../modules/functions';

import EnemyAI from '../AI/enemy-AI';
import ITank from '../interfaces/tank';
import Tank from './base/tank';
import IBattleScene from '../interfaces/battle-scene';

class Enemy extends Tank implements ITank {
    coolDown = 2;

    private readyToUpdate = true;

    private controller: EnemyAI;

    public HP = 2;

    constructor(scene: IBattleScene, x: number, y: number) {
        super(scene, x, y, true, 'light');

        this.HP = 2;

        this.controller = new EnemyAI(1, this as ITank);

        this.setImmovable(true);
    }

    update() {
        if (!this.readyToUpdate) return;

        setTimeout(() => {
            this.readyToUpdate = true;
        }, 200);
        this.readyToUpdate = false;
        this.move(randIntFrZ(3));
    }

    destroy() {
        this.controller.destroy();

        super.destroy();
    }
}

export default Enemy;
