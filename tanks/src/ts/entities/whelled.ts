import EnemyAI from '../AI/enemy-AI';
import ITank from '../interfaces/tank';
import Tank from './base/tank';
import IBattleScene from '../interfaces/battle-scene';

class Whelled extends Tank implements ITank {
    protected readyToUpdate = true;

    public HP = 1;

    constructor(scene: IBattleScene, x: number, y: number) {
        super(scene, x, y, true, 'wheeled');

        this.speed *= 1.5;

        this.controller = new EnemyAI(1, this as ITank);
    }

    destroy() {
        setTimeout(() => {
            super.destroy();
        }, 0.000000000001);
        this.scene.events.emit('killed');
        this.controller.destroy();
        // не спрашивайте зачем :)
    }

    getShot() {
        this.destroy();
    }
}

export default Whelled;
