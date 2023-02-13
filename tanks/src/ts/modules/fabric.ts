import IBattleScene from '../interfaces/battle-scene';
import { randIntFrZ } from './functions';
import { FabticConfig } from '../interfaces/based';
import Light from '../entities/light';
import Whelled from '../entities/whelled';
import Shooter from '../entities/shooter';
import Heavy from '../entities/heavy';

class Fabric {
    private scene: IBattleScene;

    private coords: FabticConfig['coords'];

    private plan: FabticConfig['plan'];

    constructor(scene: IBattleScene, config: FabticConfig) {
        this.scene = scene;
        this.plan = config.plan.reverse();
        this.coords = config.coords;

        this.coords.forEach((coord) => {
            this.scene.addTank(new Light(this.scene, coord.x, coord.y));
        });
    }

    produce() {
        const coord = this.coords[randIntFrZ(this.coords.length - 1)];

        switch (this.plan.pop()) {
            case 'light': {
                this.scene.addTank(new Light(this.scene, coord.x, coord.y));
                break;
            }
            case 'whelled': {
                this.scene.addTank(new Whelled(this.scene, coord.x, coord.y));
                break;
            }
            case 'shooter': {
                this.scene.addTank(new Shooter(this.scene, coord.x, coord.y));
                break;
            }
            case 'heavy': {
                this.scene.addTank(new Heavy(this.scene, coord.x, coord.y));
                break;
            }
            default: {
                console.log('no tanks');
            }
        }
    }
}
export default Fabric;
