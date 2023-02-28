import EnemyAI from '../AI/enemy-AI';
import ITank from '../interfaces/tank';
import Tank from './base/tank';
import IBattleScene from '../interfaces/battle-scene';
import { Enemies } from '../modules/score-config';

class Whelled extends Tank implements ITank {
    protected readyToUpdate = true;

    public HP = 1;

    constructor(scene: IBattleScene, x: number, y: number) {
        super(scene, x, y, true, 'wheeled');

        this.speed *= 1.5;

        this.controller = new EnemyAI(1, this as ITank);
    }

    lastChanse() {
        this.scene.events.emit('count', Enemies.wheeled, this.x, this.y);
    }
}

export default Whelled;
