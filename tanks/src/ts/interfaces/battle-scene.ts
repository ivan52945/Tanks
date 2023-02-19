import { Group } from './based';

interface IBattleScene extends Phaser.Scene {
    addBonus?(): Phaser.Physics.Arcade.StaticBody;

    addTank(tank: Phaser.Physics.Arcade.Sprite): void;

    addShot(shot: Phaser.Physics.Arcade.Sprite): void;

    getTanks(): Group;
}

export default IBattleScene;
