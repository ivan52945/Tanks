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
        console.log('this.score: ', this.score, this.stage);

        const sum = this.score.reduce((a, b) => a + b, 0);

        const standardFont = { font: '35px Pixel' };

        this.add.text(100, 60, 'HI-Score ', { font: '35px Pixel', color: '#FF4500' });
        this.add.text(600, 60, `${total}`, { font: '35px Pixel', color: '#FFD700' }); // рекорд очков
        this.add.text(300, 130, 'STAGE ', standardFont);
        this.add.text(520, 130, `${this.stage}`, standardFont); // номер пройденного уровня
        this.add.text(10, 200, 'PLAYER', { font: '35px Pixel', color: '#FF4500' });
        this.add.text(10, 270, `${total}`, { font: '35px Pixel', color: '#FFD700' }); // кол-во очков игрока за всю кампанию
        this.add.text(250, 400, `PTS`, { font: '35px Pixel' });
        this.add.text(250, 470, `PTS`, { font: '35px Pixel' });
        this.add.text(250, 540, `PTS`, { font: '35px Pixel' });
        this.add.text(250, 610, `PTS`, { font: '35px Pixel' });
        this.load.atlas('tanks', tanksPlayerImge, tanksPlayerJSON);
        this.add.text(400, 400, `${this.score[Enemies.light]}`, standardFont); // сколько ЛТ уничтожено
        this.add.text(400, 470, `${this.score[Enemies.wheeled]}`, standardFont); // сколько КТ уничтожено
        this.add.text(400, 540, `${this.score[Enemies.shooter]}`, standardFont); // сколько СТ уничтожено
        this.add.text(400, 610, `${this.score[Enemies.heavy]}`, standardFont); // сколько ТТ уничтожено

        this.add.text(190, 680, `TOTAL ${sum}`, standardFont); // всего уничтожено
    }

    create() {
        this.add.image(540, 410, 'tanks', 'enemy_light_1');
        this.add.image(540, 480, 'tanks', 'enemy_wheeled_1');
        this.add.image(540, 550, 'tanks', 'enemy_shooter_1');
        this.add.image(540, 625, 'tanks', 'enemy_heavy_1');
        if (this.score[Enemies.light]) {
            this.add.text(10, 400, `100`, { font: '35px Pixel' });
        } else {
            this.add.text(10, 400, `0`, { font: '35px Pixel' });
        }
        if (this.score[Enemies.wheeled]) {
            this.add.text(10, 470, `200`, { font: '35px Pixel' });
        } else {
            this.add.text(10, 470, `0`, { font: '35px Pixel' });
        }
        if (this.score[Enemies.shooter]) {
            this.add.text(10, 540, `300`, { font: '35px Pixel' });
        } else {
            this.add.text(10, 540, `0`, { font: '35px Pixel' });
        }
        if (this.score[Enemies.wheeled]) {
            this.add.text(10, 610, `400`, { font: '35px Pixel' });
        } else {
            this.add.text(10, 610, `0`, { font: '35px Pixel' });
        }

        setTimeout(() => {
            this.scene.start('StageNumberScene', { stage: this.stage });
        }, 3000);

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
