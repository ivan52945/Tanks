import Tank from '../entities/base/tank';
import IBattleScene from '../interfaces/battle-scene';

class BonusFabric {
    private scene: IBattleScene;

    constructor(scene: IBattleScene) {
        this.scene = scene;

        this.scene.events.on('getBonus', () => {
            console.log('bonus geted');
            // TODO: add code of adding bonus to card
        });
    }

    select(tank: Tank) {
        tank.setData('bonus', true);

        tank.startBlink('bonus');

        setTimeout(() => {
            tank.setData('bonus', null);
        }, 8000);
    }
}
export default BonusFabric;
