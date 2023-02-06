import randIntFrZ from '../modules/functions';

class PlayerAI {
    public manual: boolean;

    constructor(time: number, callback: (direction: number) => void, manual = true) {
        this.manual = manual;

        setTimeout(() => {
            if (this.manual) return;

            callback(randIntFrZ(3));
        }, 0);

        setInterval(() => {
            if (this.manual) return;

            callback(randIntFrZ(3));
        }, time * 1000);
    }
}
export default PlayerAI;
