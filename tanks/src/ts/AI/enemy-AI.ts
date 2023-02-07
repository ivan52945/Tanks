import randIntFrZ from '../modules/functions';
import IController from '../interfaces/controller';

class EnemyAI implements IController {
    readonly callback: (direction: number) => void;

    constructor(time: number, callback: (direction: number) => void) {
        this.callback = callback;

        setTimeout(() => {
            this.callback(randIntFrZ(3));
        }, 0);

        setInterval(() => {
            this.callback(randIntFrZ(3));
        }, time * 1000);
    }

    update() {
        this.callback(randIntFrZ(3));
    }
}
export default EnemyAI;
