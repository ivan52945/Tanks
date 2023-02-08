import PlayerAI from '../AI/player-AI';
import IBattleScene from '../interfaces/battle-scene';
import ITank from '../interfaces/tank';
import randIntFrZ from '../modules/functions';
import Tank from './base/tank';

class Player extends Tank implements ITank {
    coolDown = 2;

    public HP = 2;

    public manual;

    private controller = new PlayerAI(1, this);

    constructor(scene: IBattleScene, x: number, y: number, manual = true) {
        super(scene, x, y, false, 'main', true);

        this.manual = manual;
    }

    update() {
        if (!this.manual) {
            this.move(randIntFrZ(3));
        } else {
            this.stopMove();
        }
    }
}

export default Player;
