import tanksPlayerImge from '../../assets/images/tanks.png';
import tanksPlayerJSON from '../../assets/images/tanks.json';

class ScoreScene extends Phaser.Scene {
    keys: unknown;
    private score!: string;
    private hiScore: string = '20000';
    private stage!: string;
    private type!: any;
    private countLight: number = 0;
    private countWheeled: number = 0;
    private countShooter: number = 0;
    private countHeavy: number = 0;
    private scoreTanks: string | undefined = '0';

    constructor() {
        super({
            key: 'ScoreScene',
        });
    }
    init(data: any) {
        console.log('init', data);
        this.score = data.score;
        this.stage = data.stage;
        this.type = data.type;
        this.countLight = data.countLight;
        this.countWheeled = data.countWheeled;
        this.countShooter = data.countShooter;
        this.countHeavy = data.countHeavy;
    }

    preload() {
        this.add.text(100, 60, 'HI-Score ', { font: '35px Pixel', color: '#FF4500' });
        this.add.text(600, 60, this.hiScore, { font: '35px Pixel', color: '#FFD700' }); // рекорд очков
        this.add.text(300, 130, 'STAGE ', { font: '35px Pixel' });
        this.add.text(520, 130, this.stage, { font: '35px Pixel' }); // номер пройденного уровня
        this.add.text(10, 200, 'PLAYER', { font: '35px Pixel', color: '#FF4500' });
        this.add.text(10, 270, this.score, { font: '35px Pixel', color: '#FFD700' }); // кол-во очков игрока за всю кампанию
        this.load.atlas('tanksPlr', tanksPlayerImge, tanksPlayerJSON);
        this.add.text(400, 400, `${this.countLight}`, { font: '35px Pixel' }); // сколько ЛТ уничтожено
        this.add.text(400, 470, `${this.countWheeled}`, { font: '35px Pixel' }); // сколько КТ уничтожено
        this.add.text(400, 540, `${this.countShooter}`, { font: '35px Pixel' }); // сколько СТ уничтожено
        this.add.text(400, 610, `${this.countHeavy}`, { font: '35px Pixel' }); // сколько ТТ уничтожено
        this.add.text(190, 680, `TOTAL ${this.countLight + this.countWheeled + this.countShooter + this.countHeavy}`, {
            font: '35px Pixel',
        }); // всего уничтожено
    }

    create() {
        this.add.image(540, 410, 'tanksPlr', 'enemy_light_1');
        this.add.image(540, 480, 'tanksPlr', 'enemy_wheeled_1');
        this.add.image(540, 550, 'tanksPlr', 'enemy_shooter_1');
        this.add.image(540, 625, 'tanksPlr', 'enemy_heavy_1');

        if (Object.keys(this.type).find((key) => this.type[key] === 'light')) {
            this.scoreTanks = Object.keys(this.type).find((key) => this.type[key] === 'light');
            this.add.text(10, 400, `${this.scoreTanks} PTS`, { font: '35px Pixel' });
        } else {
            this.scoreTanks = '0';
            this.add.text(10, 400, `${this.scoreTanks} PTS`, { font: '35px Pixel' });
        }
        if (Object.keys(this.type).find((key) => this.type[key] === 'wheeled')) {
            this.scoreTanks = Object.keys(this.type).find((key) => this.type[key] === 'wheeled');
            this.add.text(10, 470, `${this.scoreTanks} PTS`, { font: '35px Pixel' });
        } else {
            this.scoreTanks = '0';
            this.add.text(10, 470, `${this.scoreTanks} PTS`, { font: '35px Pixel' });
        }
        if (Object.keys(this.type).find((key) => this.type[key] === 'shooter')) {
            this.scoreTanks = Object.keys(this.type).find((key) => this.type[key] === 'shooter');
            this.add.text(10, 540, `${this.scoreTanks} PTS`, { font: '35px Pixel' });
        } else {
            this.scoreTanks = '0';
            this.add.text(10, 540, `${this.scoreTanks} PTS`, { font: '35px Pixel' });
        }
        if (Object.keys(this.type).find((key) => this.type[key] === 'heavy')) {
            this.scoreTanks = Object.keys(this.type).find((key) => this.type[key] === 'heavy');
            this.add.text(10, 610, `${this.scoreTanks} PTS`, { font: '35px Pixel' });
        } else {
            this.scoreTanks = '0';
            this.add.text(10, 610, `${this.scoreTanks} PTS`, { font: '35px Pixel' });
        }

        setTimeout(() => {
            this.scene.start('StageNumberScene', { stage: this.stage });
        }, 2000);

        this.input.keyboard.on('keydown', (event: { key: string }) => {
            if (event.key === 'p') {
                // ------- Инструмент разработчика. Переключатель сцен на англ. 'p'
                this.scene.start('HiscoreScene');
            }
        });
    }

    update() {}
}

export default ScoreScene;
