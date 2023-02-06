// import logoImg from '../../assets/images/battle-city.png';
// import cursor from '../../assets/images/tank.png';
import lightTank from '../../assets/images/gray-light-tank.png';
import wheeledTank from '../../assets/images/gray-wheeled-tank.png';
import mediumTank from '../../assets/images/gray-medium-tank.png';
import heavyTank from '../../assets/images/gray-heavy-tank.png';

class ScoreScene extends Phaser.Scene {
    keys: unknown;

    constructor() {
        super({
            key: 'ScoreScene',
        });
    }

    preload() {
        this.add.text(100, 60, 'HI-Score ', { font: '35px Pixel', color: '#FF4500' });
        this.add.text(600, 60, '000000', { font: '35px Pixel', color: '#FFD700' }); // рекорд очков
        this.add.text(300, 130, 'STAGE ', { font: '35px Pixel' });
        this.add.text(520, 130, '00', { font: '35px Pixel' }); // номер пройденного уровня
        this.add.text(10, 200, 'PLAYER', { font: '35px Pixel', color: '#FF4500' });
        this.add.text(10, 270, '000000', { font: '35px Pixel', color: '#FFD700' }); // кол-во очков игрока за всю кампанию
        this.add.text(10, 400, '0000 PTS', { font: '35px Pixel' }); // очки за лёгкий танк
        this.load.image('lightTank', lightTank);
        this.add.text(400, 400, '00-', { font: '35px Pixel' }); // сколько ЛТ уничтожено
        this.add.text(10, 470, '0000 PTS', { font: '35px Pixel' }); // очки за колёсный танк
        this.load.image('wheeledTank', wheeledTank);
        this.add.text(400, 470, '00-', { font: '35px Pixel' }); // сколько КТ уничтожено
        this.add.text(10, 540, '0000 PTS', { font: '35px Pixel' }); // очки за средний танк
        this.load.image('mediumTank', mediumTank);
        this.add.text(400, 540, '00-', { font: '35px Pixel' }); // сколько СТ уничтожено
        this.add.text(10, 610, '0000 PTS', { font: '35px Pixel' }); // очки за тяжёлый танк
        this.load.image('heavyTank', heavyTank);
        this.add.text(400, 610, '00-', { font: '35px Pixel' }); // сколько ТТ уничтожено
        this.add.text(190, 680, 'TOTAL 00', { font: '35px Pixel' }); // всего уничтожено
    }

    create() {
        this.add.image(540, 410, 'lightTank');
        this.add.image(540, 480, 'wheeledTank');
        this.add.image(540, 550, 'mediumTank');
        this.add.image(540, 625, 'heavyTank');
        this.input.keyboard.on('keydown', (event: { key: string }) => {
            if (event.key === 'p') {
                // ------- Инструмент разработчика. Переключатель сцен на англ. 'p'
                this.scene.start('HiscoreScene');
            }
        });
    }

    update() {
        console.log('ScoreScene');
    }
}
export default ScoreScene;
