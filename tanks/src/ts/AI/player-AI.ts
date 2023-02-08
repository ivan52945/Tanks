import randIntFrZ from '../modules/functions';
import IController from '../interfaces/controller';

import ITank from '../interfaces/tank';

class PlayerAI implements IController {
    readonly tank: ITank;

    readonly moveTimer: NodeJS.Timer;

    readonly shotTimer: NodeJS.Timer;

    constructor(time: number, tank: ITank) {
        this.tank = tank;

        const move = () => {
            if (this.tank.manual) return;

            this.tank.move(randIntFrZ(3));
        };

        const shot = () => {
            if (this.tank.manual) return;

            if (Math.random() < 0.7) {
                this.tank.shot();
            }
        };

        setTimeout(move, 0);

        this.moveTimer = setInterval(move, time * 1000);
        this.shotTimer = setInterval(shot, time * 200);
    }

    destroy() {
        clearInterval(this.moveTimer);
        clearInterval(this.shotTimer);
    }
}
export default PlayerAI;
