import EnemyAI from '../AI/enemy-AI';
import Tank from './base/tank';

class Enemy extends Tank {
    private controller: EnemyAI;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, true, 'main');

        this.controller = new EnemyAI(1, (dir) => {
            this.move(dir);
        });
    }
}

export default Enemy;
