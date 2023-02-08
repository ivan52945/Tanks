import randIntFrZ from '../modules/functions';
import IController from '../interfaces/controller';
import ITank from '../interfaces/tank';

class EnemyAI implements IController {
    readonly tank: ITank;

    readonly moveTimer: NodeJS.Timer;

    readonly shotTimer: NodeJS.Timer;

    constructor(time: number, tank: ITank) {
        this.tank = tank;

        const move = () => {
            this.tank.move(randIntFrZ(3));
        };

        const shot = () => {
            if (Math.random() < 0.5) {
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
}
export default EnemyAI;
