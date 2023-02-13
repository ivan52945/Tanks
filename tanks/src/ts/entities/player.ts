import PlayerAI from '../AI/player-AI';
import IBattleScene from '../interfaces/battle-scene';
import ITank from '../interfaces/tank';
import { randIntFrZ } from '../modules/functions';
import Shot from './base/shot';
import Tank from './base/tank';

class Player extends Tank implements ITank {
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

    getShot(shot: Shot) {
        if ((this.dir + shot.dir) % 4 === 2) {
            this.HP -= 1;
        } else {
            this.HP -= 2;
        }
        if (this.HP > 0) return;

        this.destroy();
    }

    destroy() {
        // destroy
        this.scene.events.emit('GameOver');
        super.destroy();
    }
}

export default Player;
