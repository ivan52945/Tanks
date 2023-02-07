import randIntFrZ from '../modules/functions';
import IController from '../interfaces/controller';

class PlayerAI implements IController {
    public manual: boolean;

    readonly callback: (direction: number) => void;

    constructor(time: number, callback: (direction: number) => void, manual = true) {
        this.manual = manual;

        this.callback = callback;

        setTimeout(() => {
            if (this.manual) return;

            this.callback(randIntFrZ(3));
        }, 0);

        setInterval(() => {
            if (this.manual) return;

            this.callback(randIntFrZ(3));
        }, time * 1000);
    }

    update() {
        this.callback(randIntFrZ(3));
    }
}
export default PlayerAI;
