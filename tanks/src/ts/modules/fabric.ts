import IBattleScene from '../interfaces/battle-scene';
import randIntFrZ from './functions';
import { FabticConfig } from '../interfaces/based';
import Enemy from '../entities/enemy';

class Fabric {
    private scene: IBattleScene;

    private coords: FabticConfig['coords'];

    private plan: FabticConfig['plan'];

    constructor(scene: IBattleScene, config: FabticConfig) {
        this.scene = scene;
        this.plan = config.plan.reverse();
        this.coords = config.coords;

        this.coords.forEach((coord) => {
            this.scene.addTank(new Enemy(this.scene, coord.x, coord.y));
        });
    }

    produce() {
        const coord = this.coords[randIntFrZ(this.coords.length - 1)];

        switch (this.plan.pop()) {
            case 'main': {
                this.scene.addTank(new Enemy(this.scene, coord.x, coord.y));
                break;
            }
            default: {
                console.log('no tanks');
            }
        }
    }
}
export default Fabric;
