import randIntFrZ from '../modules/functions';

import EnemyAI from '../AI/enemy-AI';
import ITank from '../interfaces/tank';
import Tank from './base/tank';

class Enemy extends Tank implements ITank {
    private controller: EnemyAI;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, true, 'main');

        this.HP = 2;

        this.controller = new EnemyAI(1, (dir) => {
            this.move(dir);
        });
    }

    update() {
        this.move(randIntFrZ(3));
    }
}

export default Enemy;
