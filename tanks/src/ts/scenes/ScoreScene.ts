import tanksPlayerImge from '../../assets/images/tanks.png';
import tanksPlayerJSON from '../../assets/images/tanks.json';
import { Enemies, EnemyPoints } from '../modules/score-config';

class ScoreScene extends Phaser.Scene {
    keys: unknown;

    private score!: number[];

    private stage!: number;

    constructor() {
        super({
            key: 'ScoreScene',
        });
    }

    init(result: { stage: number; score: number[] }) {
        this.stage = result.stage;
        this.score = result.score;
    }

    preload() {
        const total = this.score.reduce((acc, c, i) => acc + c * EnemyPoints[i], 0);

        const standartFont = { font: '35px Pixel' };

        this.add.text(100, 60, 'HI-Score ', { font: '35px Pixel', color: '#FF4500' });
        this.add.text(600, 60, `${total}`, { font: '35px Pixel', color: '#FFD700' }); // рекорд очков
        this.add.text(300, 130, 'STAGE ', standartFont);
        this.add.text(520, 130, `${this.stage}`, standartFont); // номер пройденного уровня
        this.add.text(10, 200, 'PLAYER', { font: '35px Pixel', color: '#FF4500' });
        this.add.text(10, 270, `${total}`, { font: '35px Pixel', color: '#FFD700' }); // кол-во очков игрока за всю кампанию
        this.load.atlas('tanks', tanksPlayerImge, tanksPlayerJSON);
        this.add.text(400, 400, `${this.score[Enemies.light]}`, standartFont); // сколько ЛТ уничтожено
        this.add.text(400, 470, `${this.score[Enemies.whelled]}`, standartFont); // сколько КТ уничтожено
        this.add.text(400, 540, `${this.score[Enemies.shooter]}`, standartFont); // сколько СТ уничтожено
        this.add.text(400, 610, `${this.score[Enemies.heavy]}`, standartFont); // сколько ТТ уничтожено

        this.add.text(190, 680, `TOTAL ${total}`, standartFont); // всего уничтожено
    }

    create() {
        this.add.image(540, 410, 'tanks', 'enemy_light_1');
        this.add.image(540, 480, 'tanks', 'enemy_wheeled_1');
        this.add.image(540, 550, 'tanks', 'enemy_shooter_1');
        this.add.image(540, 625, 'tanks', 'enemy_heavy_1');
        /*
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
        */
        setTimeout(() => {
            this.scene.start('StageNumberScene', { stage: this.stage });
        }, 10000);

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
