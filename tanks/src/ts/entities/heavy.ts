import EnemyAI from '../AI/enemy-AI';
import ITank from '../interfaces/tank';
import Tank from './base/tank';
import IBattleScene from '../interfaces/battle-scene';
import Shot from './base/shot';
import { Enemies } from '../modules/score-config';

class Heavy extends Tank implements ITank {
    protected readyToUpdate = true;

    protected speed = 90;

    public HP = 3;

    constructor(scene: IBattleScene, x: number, y: number) {
        super(scene, x, y, true, 'heavy');

        this.controller = new EnemyAI(1, this as ITank);

        setTimeout(() => {
            scene.anims.create({
                key: `${this.key}_green`,
                frames: this.anims.generateFrameNames('tanks', { prefix: `${this.key}_green_`, start: 1, end: 2 }),
                repeat: -1,
            });
            scene.anims.create({
                key: `${this.key}_yellow`,
                frames: this.anims.generateFrameNames('tanks', { prefix: `${this.key}_yellow_`, start: 1, end: 2 }),
                repeat: -1,
            });
        }, 0);
    }

    lastChanse() {
        this.scene.events.emit('killed', Enemies.heavy);
    }

    getShot(shot: Shot): void {
        const damegeList = [``, `_green`, `_yellow`];

        super.getShot(shot);

        if (this.HP > 0) {
            this.animField = this.scene.anims.get(`${this.key}${damegeList[3 - this.HP]}`);
            this.anims.play(this.animField);
        }
    }
}

export default Heavy;
