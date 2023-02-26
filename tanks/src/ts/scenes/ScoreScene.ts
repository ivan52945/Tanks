import { EnemyPoints } from '../modules/score-config';

class ScoreScene extends Phaser.Scene {
    keys: unknown;

    private score!: { tanks: number[]; add: number };

    private stage!: number;

    private record = 0;

    private hiScore = 20000;

    constructor() {
        super({
            key: 'ScoreScene',
        });
    }

    init(result: { stage: number; score: { tanks: number[]; add: number } }) {
        this.stage = result.stage;
        this.score = result.score;

        if (this.stage === 1) this.record = 0;
    }

    preload() {
        ('');
    }

    create() {
        const { tanks: score, add } = this.score;

        this.record += score.reduce((acc, c, i) => acc + c * EnemyPoints[i], 0) + add;

        const sum = this.score.tanks.reduce((a, b) => a + b, 0);

        const standardFont = { font: '35px Pixel' };
        if (this.hiScore > this.record) {
            this.add.text(600, 60, `${this.hiScore}`, { font: '35px Pixel', color: '#FFD700' }); // рекорд очков
        }
        this.add.text(100, 60, 'HI-Score ', { font: '35px Pixel', color: '#FF4500' });
        this.add.text(300, 130, 'STAGE ', standardFont);
        this.add.text(520, 130, `${this.stage}`, standardFont); // номер пройденного уровня
        this.add.text(10, 200, 'PLAYER', { font: '35px Pixel', color: '#FF4500' });
        this.add.text(10, 270, `${this.record}`, { font: '35px Pixel', color: '#FFD700' }); // кол-во очков игрока за всю кампанию

        const tanks = ['enemy_light_1', 'enemy_wheeled_1', 'enemy_shooter_1', 'enemy_heavy_1'];

        score.forEach((count, i) => {
            const pos = i * 70;

            this.add.image(540, 410 + pos, 'tanks', tanks[i]);
            this.add.text(10, 400 + pos, `${EnemyPoints[i]}`, { font: '35px Pixel' });
            this.add.text(250, 400 + pos, `PTS`, standardFont);

            this.add.text(400, 400 + pos, `${score[i]}`, standardFont);
        });

        this.add.text(190, 680, `TOTAL ${sum}`, standardFont); // всего уничтожено
        if (this.record > this.hiScore) {
            this.hiScore = this.record;
            this.add.text(600, 60, `${this.hiScore}`, { font: '35px Pixel', color: '#FFD700' }); // рекорд очков
            setTimeout(() => {
                this.scene.start('HiscoreScene', { stage: this.stage + 1, hiScore: this.hiScore });
            }, 3000);
        } else {
            setTimeout(() => {
                this.scene.start('StageNumberScene', { stage: this.stage + 1 });
            }, 3000);
        }

        this.input.keyboard.on('keydown', (event: { key: string }) => {
            if (event.key === 'q') {
                // ------- Инструмент разработчика. Переключатель сцен на англ. 'q'
                this.scene.start('HiscoreScene');
            }
        });
    }

    update() {
        ('');
    }
}

export default ScoreScene;
