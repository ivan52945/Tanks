import tanksPlayerImge from '../../assets/images/tanks.png';
import tanksPlayerJSON from '../../assets/images/tanks.json';

class ScoreScene extends Phaser.Scene {
    keys: unknown;
    private score!: string;
    private hiScore: string = '20000';
    private stage!: string;
    private type!: {};

    private total: number = 0;
    constructor() {
        super({
            key: 'ScoreScene',
        });
    }
    init(data: any) {
        //-------------------------передает скор и номер уровня  из гейм сцены
        console.log('init', data);
        this.score = data.score;
        this.stage = data.stage;
        this.type = data.type;
    }

    preload() {
        this.add.text(100, 60, 'HI-Score ', { font: '35px Pixel', color: '#FF4500' });
        this.add.text(600, 60, this.hiScore, { font: '35px Pixel', color: '#FFD700' }); // рекорд очков
        this.add.text(300, 130, 'STAGE ', { font: '35px Pixel' });
        this.add.text(520, 130, this.stage, { font: '35px Pixel' }); // номер пройденного уровня
        this.add.text(10, 200, 'PLAYER', { font: '35px Pixel', color: '#FF4500' });
        this.add.text(10, 270, this.score, { font: '35px Pixel', color: '#FFD700' }); // кол-во очков игрока за всю кампанию
        this.add.text(10, 400, '0000 PTS', { font: '35px Pixel' }); // очки за лёгкий танк
        this.load.atlas('tanksPlr', tanksPlayerImge, tanksPlayerJSON);
        this.add.text(400, 400, '00-', { font: '35px Pixel' }); // сколько ЛТ уничтожено
        this.add.text(10, 470, '0000 PTS', { font: '35px Pixel' }); // очки за колёсный танк
        this.add.text(400, 470, '00-', { font: '35px Pixel' }); // сколько КТ уничтожено
        this.add.text(10, 540, '0000 PTS', { font: '35px Pixel' }); // очки за средний танк
        this.add.text(400, 540, '00-', { font: '35px Pixel' }); // сколько СТ уничтожено
        this.add.text(10, 610, '0000 PTS', { font: '35px Pixel' }); // очки за тяжёлый танк
        this.add.text(400, 610, '00-', { font: '35px Pixel' }); // сколько ТТ уничтожено
        this.add.text(190, 680, `TOTAL ${this.total}`, { font: '35px Pixel' }); // всего уничтожено
    }

    create() {
        this.add.image(540, 410, 'tanksPlr', 'enemy_light_1');
        this.add.image(540, 480, 'tanksPlr', 'enemy_wheeled_1');
        this.add.image(540, 550, 'tanksPlr', 'enemy_shooter_1');
        this.add.image(540, 625, 'tanksPlr', 'enemy_heavy_1');

        this.input.keyboard.on('keydown', (event: { key: string }) => {
            if (event.key === 'p') {
                // ------- Инструмент разработчика. Переключатель сцен на англ. 'p'
                this.scene.start('HiscoreScene');
            }
        });
    }

    update() {
        // console.log('ScoreScene');
    }
}
export default ScoreScene;
