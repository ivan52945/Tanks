import { randIntFrZ } from '../modules/functions';
import IController from '../interfaces/controller';
import ITank from '../interfaces/tank';

class EnemyAI implements IController {
    public freezed = false;

    readonly tank: ITank;

    readonly moveTimer: NodeJS.Timer;

    readonly shotTimer: NodeJS.Timer;

    constructor(time: number, tank: ITank) {
        this.tank = tank;

        const move = () => {
            if (!this.freezed) {
                this.tank.move(randIntFrZ(3));
            } else {
                this.tank.stopMove();
            }
        };

        const shot = () => {
            if (this.freezed) return;

            if (Math.random() < 1.0) {
                this.tank.shot();
            }
        };

        setTimeout(move, 0);

        this.shotTimer = setInterval(shot, time * 200);
        this.moveTimer = setInterval(move, time * 1000);
    }

    update() {
        this.tank.move(randIntFrZ(3));
    }

    destroy() {
        clearInterval(this.moveTimer);
        clearInterval(this.shotTimer);
    }

    freeze() {
        this.freezed = true;
        this.tank.stopMove();

        setTimeout(() => {
            this.freezed = false;
            this.tank.update?.();
        }, 8000);
    }
}
export default EnemyAI;
