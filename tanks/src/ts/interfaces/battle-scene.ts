interface IBattleScene extends Phaser.Scene {
    addTank(tank: Phaser.Physics.Arcade.Sprite): void;

    addShot(shot: Phaser.Physics.Arcade.Sprite): void;
}

export default IBattleScene;
