import IBattleScene from '../interfaces/battle-scene';
import { randIntFrZ } from './functions';
import { FabticConfig } from '../interfaces/based';
import Light from '../entities/light';
import Whelled from '../entities/whelled';
import Shooter from '../entities/shooter';
import Heavy from '../entities/heavy';
import BonusFabric from './bonus-fabric';
import Tank from '../entities/base/tank';

class Fabric {
    private scene: IBattleScene;

    private coords: FabticConfig['coords'];

    private plan: FabticConfig['plan'];

    private bonusing: BonusFabric;

    constructor(scene: IBattleScene, config: FabticConfig) {
        this.scene = scene;
        this.plan = config.plan.reverse();
        this.coords = config.coords;

        this.coords.forEach((coord) => {
            this.scene.addTank(new Light(this.scene, coord.x, coord.y));
        });

        this.bonusing = new BonusFabric(this.scene);
    }

    produce() {
        const coord = this.coords[randIntFrZ(this.coords.length - 1)];

        let tank: Tank | undefined;

        switch (this.plan.pop()) {
            case 'light': {
                tank = new Light(this.scene, coord.x, coord.y);
                break;
            }
            case 'whelled': {
                tank = new Whelled(this.scene, coord.x, coord.y);
                break;
            }
            case 'shooter': {
                tank = new Shooter(this.scene, coord.x, coord.y);
                break;
            }
            case 'heavy': {
                tank = new Heavy(this.scene, coord.x, coord.y);
                break;
            }
            default: {
                console.log('no tanks');
            }
        }

        if (!tank) return;

        this.bonusing.select(tank as Tank);
        this.scene.addTank(tank as Tank);
    }

    get planSize() {
        return this.plan.length;
    }
}
export default Fabric;
