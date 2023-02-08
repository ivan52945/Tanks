import randIntFrZ from '../modules/functions';
import IController from '../interfaces/controller';

import ITank from '../interfaces/tank';

class PlayerAI implements IController {
    readonly tank: ITank;

    readonly move: () => void;

    // readonly shot: () => void;

    constructor(time: number, tank: ITank) {
        this.tank = tank;

        this.move = () => {
            if (this.tank.manual) return;

            this.tank.move(randIntFrZ(3));
        };
        setTimeout(this.move, 0);

        setInterval(this.move, time * 1000);
    }
}
export default PlayerAI;
