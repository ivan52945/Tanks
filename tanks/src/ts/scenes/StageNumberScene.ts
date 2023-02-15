class StageNumberScene extends Phaser.Scene {
    keys: unknown;

    private stageNumber = 1;

    constructor() {
        super({
            key: 'StageNumberScene',
        });
    }

    init(result: { stage: number }) {
        this.stageNumber = result.stage + 1 || this.stageNumber;
    }

    preload() {
        this.add.text(300, 500, `stage ${this.stageNumber}`, { font: '50px Pixel' });
    }

    create() {
        setTimeout(() => {
            this.scene.start('GameScene', { stage: this.stageNumber });
        }, 2000);
    }

    update() {}
}
export default StageNumberScene;
