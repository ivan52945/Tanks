import { Group } from './based';

interface IBattleScene extends Phaser.Scene {
    addTank(tank: Phaser.Physics.Arcade.Sprite): void;

    addShot(shot: Phaser.Physics.Arcade.Sprite): void;

    getTanks(): Group;
}

export default IBattleScene;
