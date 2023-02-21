class PauseScene extends Phaser.Scene {
    keys: unknown;

    constructor() {
        super({
            key: 'PauseScene',
        });
    }

    preload() {}

    create() {
        this.input.keyboard.on('keydown', (event: { key: string }) => {
            if (event.key === 'p') {
                this.scene.resume('GameScene');
                this.scene.stop('PauseScene');
            }
        });
    }

    update() {
        // console.log('PauseScene');
    }
}
export default PauseScene;
