import PlayerAI from '../AI/player-AI';
import ITank from '../interfaces/tank';
import Tank from './base/tank';

class Player extends Tank implements ITank {
    private controller: PlayerAI;

    constructor(scene: Phaser.Scene, x: number, y: number, manual = true) {
        super(scene, x, y, false, 'main', true);

        this.HP = 2;

        this.controller = new PlayerAI(
            1,
            (dir) => {
                this.move(dir);
            },
            manual
        );

        this.controller.manual = manual;
    }

    set manual(value: boolean) {
        this.controller.manual = value;
    }

    get manual() {
        return this.controller.manual;
    }

    update() {
        if (this.manual) return;

        this.controller.update();
    }
}

export default Player;
