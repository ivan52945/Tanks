import logoImg from '../../assets/images/battle-city.png';
import tanksPlayerImge from '../../assets/images/tanks.png';
import tanksPlayerJSON from '../../assets/images/tanks.json';

import startSound from '../../assets/audio/sounds-gamestart.ogg';

class StartScene extends Phaser.Scene {
    private cursor!: Phaser.GameObjects.Sprite;

    constructor() {
        super({
            key: 'StartScene',
        });
    }

    preload() {
        const main40 = { font: '40px Pixel' };
        const main32 = { font: '32px Pixel' };

        this.add.text(100, 100, 'I- ', main40);
        this.add.text(250, 100, '00', main40); // кол-во очков игрока за всю кампанию
        this.add.text(400, 100, 'HI- ', main40);
        this.add.text(550, 100, '20000', main40); // рекорд очков
        this.load.image('logo', logoImg);
        this.load.atlas('tanks', tanksPlayerImge, tanksPlayerJSON);

        this.add.text(350, 500, 'START GAME', main32);
        this.add.text(350, 550, 'CONSTRUCTION', main32);
        this.add.text(400, 600, 'NAMCOT', { font: '40px Namco', color: '#680000' });
        this.add.text(150, 650, '© 1980 1985 NAMCO LTD.', main32);
        this.add.text(180, 700, 'ALL RIGHTS RESERVED', main32);

        this.load.audio('startSound', startSound);
    }

    create() {
        this.add.image(500, 320, 'logo');
        this.input.keyboard.createCursorKeys();
        this.cursor = this.add.sprite(300, 510, 'tanks');
        this.cursor.angle = 90;
        this.anims.create({
            // ----------------- создание анимации движени гусениц курсора
            key: 'tank',
            frames: this.anims.generateFrameNames('tanks', { prefix: 'player_1_base_up0_', start: 1, end: 2 }),
            repeat: -1,
        });

        let team: string[] = [];

        this.input.keyboard.on('keydown', (event: { key: string }) => {
            console.log('key');
            // ------------------ перемещение курсора при нажатии вверх и вниз, при нажатии пробела выбор
            if (event.key === 'ArrowDown') {
                this.cursor.y = 565;
            } else if (event.key === 'ArrowUp') {
                this.cursor.y = 510;
            } else if (event.key === ' ' && this.cursor.y === 510) {
                this.scene.start('StageNumberScene', { stage: 1 });
                this.sound.add('startSound').play(); // звук начала игры
            } else if (event.key === ' ' && this.cursor.y === 565) {
                console.log('Construction');
            } else if (event.key === 'p') {
                // ------- Инструмент разработчика. Переключатель сцен на англ. 'p'
                this.scene.start('GameOverScene');
            } else if (event.key === 't') {
                team.push('t');
            } else if (event.key === 'e') {
                team.push('e');
            } else if (event.key === 'a') {
                team.push('a');
            } else if (event.key === 'm') {
                team.push('m');
                if (team.join('') === 'team') {
                    this.scene.start('TeamScene');
                }
            }
        });

        this.events.on('shutdown', () => {
            this.input.keyboard.removeListener('keydown');
        });
    }

    update() {
        this.cursor.anims.play('tank', true); // запуск анимации
    }
}
export default StartScene;
