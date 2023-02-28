class PauseScene extends Phaser.Scene {
    keys: unknown;

    constructor() {
        super({
            key: 'PauseScene',
        });
    }

    preload() {
        this.add.text(350, 450, 'pause', { font: '50px Pixel' });
    }

    create() {
        this.input.keyboard.on('keydown', (event: { key: string }) => {
            if (event.key === 'p') {
                this.scene.resume('GameScene');
                this.scene.stop('PauseScene');
            }
        });

        this.events.once('shutdown', () => {
            this.input.keyboard.removeListener('keydown');
        });
    }
}
export default PauseScene;
