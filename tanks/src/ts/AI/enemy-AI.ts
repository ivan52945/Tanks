import randIntFrZ from '../modules/functions';

class EnemyAI {
    constructor(time: number, callback: (direction: number) => void) {
        setTimeout(() => {
            callback(randIntFrZ(3));
        }, 0);

        setInterval(() => {
            callback(randIntFrZ(3));
        }, time * 1000);
    }
}
export default EnemyAI;
