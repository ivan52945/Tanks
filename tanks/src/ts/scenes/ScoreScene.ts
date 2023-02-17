import { EnemyPoints } from '../modules/score-config';

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
        ('');
    }

    create() {
        const total = this.score.reduce((acc, c, i) => acc + c * EnemyPoints[i], 0);

        const sum = this.score.reduce((a, b) => a + b, 0);

        const standardFont = { font: '35px Pixel' };

        this.add.text(100, 60, 'HI-Score ', { font: '35px Pixel', color: '#FF4500' });
        this.add.text(600, 60, `${total}`, { font: '35px Pixel', color: '#FFD700' }); // рекорд очков
        this.add.text(300, 130, 'STAGE ', standardFont);
        this.add.text(520, 130, `${this.stage}`, standardFont); // номер пройденного уровня
        this.add.text(10, 200, 'PLAYER', { font: '35px Pixel', color: '#FF4500' });
        this.add.text(10, 270, `${total}`, { font: '35px Pixel', color: '#FFD700' }); // кол-во очков игрока за всю кампанию

        const tanks = ['enemy_light_1', 'enemy_wheeled_1', 'enemy_shooter_1', 'enemy_heavy_1'];

        this.score.forEach((count, i) => {
            const pos = i * 70;

            this.add.image(540, 410 + pos, 'tanks', tanks[i]);
            this.add.text(10, 400 + pos, `${EnemyPoints[i]}`, { font: '35px Pixel' });
            this.add.text(250, 400 + pos, `PTS`, standardFont);

            this.add.text(400, 400 + pos, `${this.score[i]}`, standardFont);
        });

        this.add.text(190, 680, `TOTAL ${sum}`, standardFont); // всего уничтожено

        setTimeout(() => {
            this.scene.start('StageNumberScene', { stage: this.stage + 1 });
        }, 3000);

        this.input.keyboard.on('keydown', (event: { key: string }) => {
            if (event.key === 'p') {
                // ------- Инструмент разработчика. Переключатель сцен на англ. 'p'
                this.scene.start('HiscoreScene');
            }
        });
    }

    update() {
        ('');
    }
}

export default ScoreScene;
