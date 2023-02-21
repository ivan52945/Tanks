import IBattleScene from '../interfaces/battle-scene';
import { randIntFrZ } from './functions';
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

    readonly min = 3;

    readonly max = 5;

    private onProduce = 0;

    private allTimers: Phaser.Time.TimerEvent[] = [];

    private tCount = 0;

    constructor(scene: IBattleScene, config: FabticConfig) {
        this.scene = scene;
        this.plan = config.plan.reverse();
        this.coords = config.coords;
        for (let i = 0; i < 1; i += 1) {
            setTimeout(() => {
                this.coords.forEach((coord) => {
                    this.produceSingle(coord.x, coord.y, 'light');
                });
            }, 2000 * i);
            this.tCount += this.coords.length;
        }
    }

    produceSingle(x: number, y: number, type?: string) {
        if (!type) return;

        const star = this.scene.add.sprite(x, y, 'starImg').play('starImgAnimation');

        setTimeout(() => {
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
            this.setBonused(tank);
        }, 1000);
    }

    setBonused(tank: Tank) {
        tank.setData('bonus', true);

        tank.startBlink('bonus');

        setTimeout(() => {
            tank.setData('bonus', null);
        }, 8000);
    }

    produce() {
        const coord = this.coords[randIntFrZ(this.coords.length - 1)];

        this.produceSingle(coord.x, coord.y, this.plan.pop());
    }

    get planSize() {
        return this.plan.length + this.onProduce;
    }

    replanish(current: number) {
        if (current >= this.min || this.onProduce > 0) return;

        this.onProduce = Math.min(this.max - current, this.plan.length);

        for (let i = 0; i < this.onProduce; i += 1) {
            this.allTimers.push(this.scene.time.delayedCall(1000, () => this.produce()));
        }

        this.allTimers.push(
            this.scene.time.delayedCall(this.onProduce * 1000, () => {
                this.onProduce = 0;
            })
        );
        console.log(this.onProduce);
    }

    destroy() {
        this.allTimers.forEach((timer) => this.scene.time.removeEvent(timer));
    }
}
export default Fabric;
