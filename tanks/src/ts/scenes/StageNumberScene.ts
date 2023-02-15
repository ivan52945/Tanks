class StageNumberScene extends Phaser.Scene {
    keys: unknown;
    private stageNumber: number = 1;

    constructor() {
        super({
            key: 'StageNumberScene',
        });
    }

    init(data: any) {
        if (data.stage) {
            this.stageNumber = data.stage + 1;
        }
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
