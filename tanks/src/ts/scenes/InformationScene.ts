import arrowImg from '../../assets/images/arrow.png';
import logoRS from '../../assets/images/logo-rs.svg';

class InformationScene extends Phaser.Scene {
    keys: unknown;

    constructor() {
        super({
            key: 'InformationScene',
        });
    }

    preload() {
        this.add.text(350, 250, ' - up', { font: '20px Pixel' });
        this.add.text(350, 300, ' - down', { font: '20px Pixel' });
        this.add.text(350, 350, ' - left', { font: '20px Pixel' });
        this.add.text(350, 400, ' - right', { font: '20px Pixel' });
        this.add.text(320, 450, 'space - shot', { font: '20px Pixel' });
        this.add.text(320, 500, 'p - pause', { font: '20px Pixel' });
        this.add.text(280, 650, 'press space to return', { font: '20px Pixel' });
        this.load.image('arrow', arrowImg);
        this.load.image('logoRS', logoRS);
    }

    create() {
        this.add.image(330, 260, 'arrow').angle = 270;
        this.add.image(330, 310, 'arrow').angle = 90;
        this.add.image(330, 360, 'arrow');
        this.add.image(330, 410, 'arrow').angle = 180;
        const logoRS = this.add.image(480, 800, 'logoRS').setInteractive({ draggable: false, cursor: 'pointer' });
        logoRS.on('pointerup', () => {
            window.open('https://rs.school/js/');
        });

        this.input.keyboard.on('keydown', (event: { key: string }) => {
            if (event.key === ' ') {
                this.scene.start('StartScene');
            }
        });

        this.events.once('shutdown', () => {
            this.input.keyboard.removeListener('keydown');
            this.input.keyboard.removeListener('pointerup');
        });
    }
}
export default InformationScene;
