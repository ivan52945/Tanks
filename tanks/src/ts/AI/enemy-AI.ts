import randIntFrZ from '../modules/functions';
import IController from '../interfaces/controller';
import ITank from '../interfaces/tank';

class EnemyAI implements IController {
    readonly tank: ITank;

    readonly move: () => void;

    readonly shot: () => void;

    constructor(time: number, tank: ITank) {
        this.tank = tank;

        this.move = () => {
            this.tank.move(randIntFrZ(3));
        };

        this.shot = () => {
            this.tank.shot();
        };

        setTimeout(this.move, 0);

        setInterval(this.move, time * 1000);
        setInterval(this.shot, time * 500);
    }

    update() {
        this.tank.move(randIntFrZ(3));
    }
}
export default EnemyAI;
