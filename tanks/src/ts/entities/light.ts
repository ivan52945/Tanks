import EnemyAI from '../AI/enemy-AI';
import ITank from '../interfaces/tank';
import Tank from './base/tank';
import IBattleScene from '../interfaces/battle-scene';

class Light extends Tank implements ITank {
    coolDown = 2;

    protected readyToUpdate = true;

    public HP = 1;

    constructor(scene: IBattleScene, x: number, y: number) {
        super(scene, x, y, true, 'light');

        this.controller = new EnemyAI(1, this as ITank);
    }

    destroy() {
        // destroy
        this.scene.events.emit('killed');
        super.destroy();
    }
}

export default Light;
