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

    private counter = 20;

    constructor(scene: IBattleScene, config: FabticConfig) {
        this.scene = scene;
        this.plan = config.plan.reverse();
        this.coords = config.coords;
        for (let i = 0; i < 1; i += 1) {
            setTimeout(() => {
                this.coords.forEach((coord) => {
                    this.produceSingle(coord.x, coord.y, 'light');
                });
            }, 3000 * i);
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
            if (this.counter % 4 === 0) {
                this.setBonused(tank);
            }
            this.counter -= 1;
        }, 1000);
    }

    setBonused(tank: Tank) {
        tank.setData('bonus', true);

        tank.startBlink('bonus');
    }

    produce() {
        const coord = this.coords[randIntFrZ(this.coords.length - 1)];

        this.produceSingle(coord.x, coord.y, this.plan.pop());
    }

    get planSize() {
        return this.plan.length;
    }
}
export default Fabric;
