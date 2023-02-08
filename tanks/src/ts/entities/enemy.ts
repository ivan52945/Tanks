import randIntFrZ from '../modules/functions';

import EnemyAI from '../AI/enemy-AI';
import ITank from '../interfaces/tank';
import Tank from './base/tank';
import IBattleScene from '../interfaces/battle-scene';

class Enemy extends Tank implements ITank {
    coolDown = 2;

    private controller: EnemyAI;

    constructor(scene: IBattleScene, x: number, y: number) {
        super(scene, x, y, true, 'main');

        this.HP = 2;

        this.controller = new EnemyAI(1, this as ITank);
    }

    update() {
        this.move(randIntFrZ(3));
    }
}

export default Enemy;
