class HiscoreScene extends Phaser.Scene {
    keys: unknown;

    constructor() {
        super({
            key: 'HiscoreScene',
        });
    }

    preload() {
        this.add.text(200, 200, 'HISCORE ', { font: '90px Pixel' });
        this.add.text(300, 350, '000000', { font: '90px Pixel' });
    }

    create() {
        this.input.keyboard.on('keydown', (event: { key: string }) => {
            if (event.key === 'q') {
                // ------- Инструмент разработчика. Переключатель сцен на англ. 'q'
                this.scene.start('GameOverScene');
            }
        });
    }

    update() {
        console.log('HiscoreScene');
    }
}
export default HiscoreScene;
