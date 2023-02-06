import randIntFrZ from './functions';

class TankAI {
    private avalable = true;

    private time: number;

    private callback: (direction: number) => void;

    constructor(time: number, callback: (direction: number) => void) {
        this.time = time * 1000;
        this.callback = callback;
    }

    update() {
        if (!this.avalable) return;

        this.avalable = false;
        this.callback(randIntFrZ(3));

        setTimeout(() => {
            this.avalable = true;
        }, this.time);
    }
}
export default TankAI;
