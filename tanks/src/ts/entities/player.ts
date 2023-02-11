import PlayerAI from '../AI/player-AI';
import IBattleScene from '../interfaces/battle-scene';
import ITank from '../interfaces/tank';
import { randIntFrZ } from '../modules/functions';
import Shot from './base/shot';
import Tank from './base/tank';

class Player extends Tank implements ITank {
    coolDown = 2;

    public HP = 2;

    protected readyToUpdate = true;

    public manual;

    readonly controller = new PlayerAI(1, this);

    constructor(scene: IBattleScene, x: number, y: number, manual = true) {
        super(scene, x, y, false, 'base', true);

        this.manual = manual;
    }

    update() {
        if (!this.manual) {
            if (!this.readyToUpdate) return;
            setTimeout(() => {
                this.readyToUpdate = true;
            }, 200);
            this.readyToUpdate = false;

            this.move(randIntFrZ(3));
        } else {
            this.stopMove();
        }
    }

    destroy() {
        setTimeout(() => {
            super.destroy();
        }, 0.000000000001);
        this.scene.events.emit('player');
        this.controller.destroy();
        // не спрашивайте зачем :)
    }

    getShot(shot: Shot) {
        if ((shot.dir + this.dir) % 2 === 0) {
            this.HP -= 1;
        } else this.HP -= 2;
        if (this.HP <= 0) this.destroy();
    }
}

export default Player;
