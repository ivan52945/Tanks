import EnemyAI from '../AI/enemy-AI';
import ITank from '../interfaces/tank';
import Tank from './base/tank';
import IBattleScene from '../interfaces/battle-scene';

class Heavy extends Tank implements ITank {
    protected readyToUpdate = true;

    protected speed = 90;

    public HP = 4;

    constructor(scene: IBattleScene, x: number, y: number) {
        super(scene, x, y, true, 'heavy');

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
        this.HP -= 1;

        if (this.HP > 0) return;

        this.destroy();
    }
}

export default Heavy;
