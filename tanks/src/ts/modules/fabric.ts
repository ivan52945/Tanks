import IBattleScene from '../interfaces/battle-scene';
import randIntFrZ from './functions';
import { FabticConfig } from '../interfaces/based';

class Fabric {
    private scene: IBattleScene;

    private coords: FabticConfig['coords'];

    private plan: FabticConfig['plan'];

    constructor(scene: IBattleScene, config: FabticConfig) {
        this.scene = scene;
        this.plan = config.plan.reverse();
        this.coords = config.coords;
    }
    /*
    produce() {
        switch(this.plan.pop()){
            case "main": {}
        }
    }
    */
}
export default Fabric;
