import IBattleScene from '../interfaces/battle-scene';
import { randIntFrZ, shuffle } from './functions';
import { FabticConfig } from '../interfaces/based';
import Light from '../entities/light';
import Wheeled from '../entities/wheeled';
import Shooter from '../entities/shooter';
import Heavy from '../entities/heavy';
import Tank from '../entities/base/tank';

class Fabric {
    private scene: IBattleScene;

    private coords: FabticConfig['coords'];

    private plan: FabticConfig['plan'];

    private treshold = 3;

    private qeue = 0;

    private counter = 0;

    private setTimeout: (callback: () => void, delay: number) => void;

    constructor(scene: IBattleScene, config: FabticConfig) {
        this.scene = scene;
        this.plan = config.plan.reverse().concat(new Array(3).fill('light'));

        this.coords = config.coords;

        console.log(this.coords);

        this.setTimeout = (function memoizer() {
            const delayerBind = scene.time.delayedCall.bind(scene.time);
            return (callback: () => void, delay: number) => delayerBind(delay, callback);
        })();

        this.replanish(0);
    }

    produceSingle(coords: { x: number; y: number }, type?: string) {
        if (!type) return;

        const { x, y } = coords;

        const star = this.scene.add.sprite(x, y, 'starImg').play('starImgAnimation');

        this.setTimeout(() => {
            let tank: Tank;

            switch (type) {
                case 'wheeled': {
                    tank = new Wheeled(this.scene, x, y);
                    break;
                }
                case 'shooter': {
                    tank = new Shooter(this.scene, x, y);
                    break;
                }
                case 'heavy': {
                    tank = new Heavy(this.scene, x, y);
                    break;
                }
                default: {
                    tank = new Light(this.scene, x, y);
                    break;
                }
            }

            star.destroy();
            this.scene.addTank(tank);
            this.counter += 1;

            if (this.counter % 4 === 0) {
                this.setBonused(tank);
            }
        }, 1000);
    }

    setBonused(tank: Tank) {
        tank.setData('bonus', true);

        tank.startBlink('bonus');
    }

    replanish(current: number) {
        if (current >= this.treshold) return;

        let needToProduce = this.treshold - current;

        const countQeue = Math.ceil(needToProduce / this.coords.length);

        const start = this.qeue;
        this.qeue += countQeue;

        for (let i = start; i < this.qeue; i += 1) {
            const balance = Math.min(needToProduce, this.coords.length);

            needToProduce -= balance;

            const spawns = shuffle(Array.from(Array(this.coords.length).keys())).splice(0, balance);

            this.setTimeout(() => {
                spawns
                    .map((s) => this.coords[s])
                    .forEach((coord) => {
                        this.producePlan(coord);
                    });

                this.qeue -= 1;
            }, 3000 * i);
        }
    }

    producePlan(coord: { x: number; y: number }) {
        this.produceSingle(coord, this.plan.pop());
    }

    produce() {
        const coord = this.coords[randIntFrZ(this.coords.length - 1)];

        this.produceSingle(coord, this.plan.pop());
    }

    get planSize() {
        return this.plan.length + this.qeue * 3;
    }
}
export default Fabric;
