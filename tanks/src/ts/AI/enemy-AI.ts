import randIntFrZ from '../modules/functions';
import IController from '../interfaces/controller';
import ITank from '../interfaces/tank';

class EnemyAI implements IController {
    readonly tank: ITank;

    readonly moveTimer: NodeJS.Timer;

    readonly shotTimer: NodeJS.Timer;

    constructor(time: number, tank: ITank) {
        this.tank = tank;

        setTimeout(this.tank.move, 0, randIntFrZ(3));

        const move = () => {
            this.tank.move(randIntFrZ(3));
        };

        const shot = () => {
            if (this.tank.manual) return;

            this.tank.shot();
        };

        this.shotTimer = setInterval(shot, time * 500);
        this.moveTimer = setInterval(move, time * 1000);
    }

    update() {
        this.tank.move(randIntFrZ(3));
    }

    destroy() {
        clearInterval(this.moveTimer);
        clearInterval(this.shotTimer);
    }
}
export default EnemyAI;
