/* eslint-disable no-fallthrough */
import PlayerAI from '../AI/player-AI';
import IBattleScene from '../interfaces/battle-scene';
import ITank from '../interfaces/tank';
import { randIntFrZ } from '../modules/functions';
import Shot from './base/shot';
import Tank from './base/tank';

class Player extends Tank implements ITank {
    public HP = 2;

    private level = 0;

    protected readyToUpdate = true;

    public manual;

    readonly controller = new PlayerAI(1, this);

    constructor(scene: IBattleScene, x: number, y: number, manual = true, level = 0) {
        super(scene, x, y, false, 'base_up0', true);

        this.manual = manual;

        for (let i = 1; i <= 3; i += 1) {
            const newKey = this.key.replace(/(\d)$/, `${i}`);

            scene.anims.create({
                key: newKey,
                frames: this.anims.generateFrameNames('tanks', { prefix: `${newKey}_`, start: 1, end: 2 }),
                repeat: -1,
            });
        }

        this.setLevel(level);
    }

    update() {
        if (!this.manual) {
            if (!this.readyToUpdate) return;
            setTimeout(() => {
                this.readyToUpdate = true;
            }, 200);
            this.readyToUpdate = false;

            this.move(randIntFrZ(3));
        } else {
            this.stopMove();
        }
    }

    getShot(shot: Shot) {
        if ((this.dir + shot.dir) % 4 === 2) {
            this.HP -= 1;
        } else {
            this.HP -= 2;
        }
        if (this.HP > 0) return;

        this.destroy();
    }

    levelUp() {
        this.setLevel(this.level + 1);
    }

    setLevel(level: number) {
        if (level === 0 || level > 3) return;

        this.level = level;

        switch (this.level) {
            case 3:
                this.shotDurab = 2;
            case 2:
                this.shotQuantity = 2;
            case 1:
                this.shotSpeedMod = 1.3;
            default:
        }

        this.animSet = this.key.replace(/(\d)$/, () => `${this.level}`);

        this.body.setSize(56, 56);
    }

    lastChanse(): void {
        this.scene.events.emit('GameOver');
    }
}

export default Player;
