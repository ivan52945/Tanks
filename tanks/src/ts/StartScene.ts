import logoImg from '../assets/images/battle-city.png';
import cursor from '../assets/images/tank.png';

class StartScene extends Phaser.Scene {
    constructor() {
        super('Game');
    }

    preload() {
        this.add.text(100, 100, 'I- ', { font: '40px Pixel' });
        this.add.text(250, 100, '00', { font: '40px Pixel' });
        this.add.text(400, 100, 'HI- ', { font: '40px Pixel' });
        this.add.text(550, 100, '00', { font: '40px Pixel' });
        this.load.image('logo', logoImg);
        this.load.image('cursor', cursor);
        this.add.text(350, 500, 'START GAME', { font: '32px Pixel' });
        this.add.text(350, 550, 'CONSTRUCTION', { font: '32px Pixel' });
        const red = this.add.text(400, 600, 'NAMCOT', { font: '40px Namco' });
        red.setTint(0x680000);
        this.add.text(150, 650, '© 1980 1985 NAMCO LTD.', { font: '32px Pixel' });
        this.add.text(180, 700, 'ALL RIGHTS RESERVED', { font: '32px Pixel' });
    }

    create() {
        this.add.image(500, 320, 'logo');
        this.input.keyboard.createCursorKeys();
        const player = this.add.image(300, 510, 'cursor');
        player.angle = 90;
        this.input.keyboard.on('keydown', function (event: { key: any }) {
            console.log('event.key: ', event.key);

            if (event.key === 'ArrowDown') {
                player.y = 565;
            } else if (event.key === 'ArrowUp') {
                player.y = 510;
            } else if (event.key === ' ') {
                alert('Start Game');
            }
        });
    }

    update() {}
}
export default StartScene;
