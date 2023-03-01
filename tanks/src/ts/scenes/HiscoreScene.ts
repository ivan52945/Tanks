class HiscoreScene extends Phaser.Scene {
    private stageNumber = 1;

    private hiScore = 0;

    constructor() {
        super({
            key: 'HiscoreScene',
        });
    }

    init(result: { stage: number; hiScore: number }) {
        this.stageNumber = result.stage || this.stageNumber;
        this.hiScore = result.hiScore;
    }

    preload() {
        this.add.text(200, 200, 'HISCORE ', { font: '90px Pixel' });
        this.add.text(300, 350, `${this.hiScore}`, { font: '90px Pixel' });
    }

    create() {
        setTimeout(() => {
            this.scene.start('StageNumberScene', { stage: this.stageNumber });
        }, 3000);
    }
}
export default HiscoreScene;
