import tankMan1 from '../../assets/images/tankman-1.png';
import tankMan2 from '../../assets/images/tankman-2.png';
import tankMan3 from '../../assets/images/tankman-3.png';

class TeamScene extends Phaser.Scene {
    keys: unknown;

    constructor() {
        super({
            key: 'TeamScene',
        });
    }

    preload() {
        this.add.text(250, 200, 'team', { font: '60px Pixel' });

        this.load.image('tankMan1', tankMan1);
        this.load.image('tankMan2', tankMan2);
        this.load.image('tankMan3', tankMan3);
        this.add.text(200, 800, 'press space to return', { font: '20px Pixel' });
    }

    create() {
        this.input.keyboard.on('keydown', (event: { key: string }) => {
            if (event.key === 'p') {
                // ------- Инструмент разработчика. Переключатель сцен на англ. 'p'
                this.scene.start('GameScene');
            } else if (event.key === ' ') {
                this.scene.start('StartScene');
            }
        });

        const one = this.add
            .image(200, 400, 'tankMan1', tankMan1)
            .setInteractive({ draggable: false, cursor: 'pointer' });
        const two = this.add
            .image(200, 500, 'tankMan2', tankMan2)
            .setInteractive({ draggable: false, cursor: 'pointer' });
        const three = this.add
            .image(200, 600, 'tankMan3', tankMan3)
            .setInteractive({ draggable: false, cursor: 'pointer' });

        one.setOrigin(0, 0);
        two.setOrigin(0, 0);
        three.setOrigin(0, 0);

        this.input.on(
            'pointerover',
            (event: { pointer: unknown }, gameObjects: { setTint: (arg0: number) => void }[]) => {
                gameObjects[0].setTint(0xff5000);
            }
        );

        this.input.on(
            'pointerout',
            (
                event: {
                    pointer: unknown;
                },
                gameObjects: { clearTint: () => void }[]
            ) => {
                gameObjects[0].clearTint();
            }
        );

        one.on('pointerup', () => {
            window.open('https://github.com/ivan52945');
        });
        two.on('pointerup', () => {
            window.open('https://github.com/ivan-kaliaskin');
        });
        three.on('pointerup', () => {
            window.open('https://github.com/guschins');
        });

        this.events.once('shutdown', () => {
            this.input.keyboard.removeListener('pointerout');
            this.input.keyboard.removeListener('pointerover');
            this.input.keyboard.removeListener('pointerup');
        });
    }
}
export default TeamScene;
