import logoImg from '../../assets/images/battle-city.png';
import tanksPlayerImge from '../../assets/images/tanks-1.png';
import tanksPlayerJSON from '../../assets/images/tanks-1.json';

import startSound from '../../assets/audio/sounds-gamestart.ogg';

class StartScene extends Phaser.Scene {
    private cursor!: Phaser.GameObjects.Sprite;

    constructor() {
        super({
            key: 'StartScene',
        });
    }

    preload() {
        this.add.text(100, 100, 'I- ', { font: '40px Pixel' });
        this.add.text(250, 100, '00', { font: '40px Pixel' }); // кол-во очков игрока за всю кампанию
        this.add.text(400, 100, 'HI- ', { font: '40px Pixel' });
        this.add.text(550, 100, '00', { font: '40px Pixel' }); // рекорд очков
        this.load.image('logo', logoImg);
        this.load.atlas('tanksPlr', tanksPlayerImge, tanksPlayerJSON);

        this.add.text(350, 500, 'START GAME', { font: '32px Pixel' });
        this.add.text(350, 550, 'CONSTRUCTION', { font: '32px Pixel' });
        this.add.text(400, 600, 'NAMCOT', { font: '40px Namco', color: '#680000' });
        this.add.text(150, 650, '© 1980 1985 NAMCO LTD.', { font: '32px Pixel' });
        this.add.text(180, 700, 'ALL RIGHTS RESERVED', { font: '32px Pixel' });

        this.load.audio('startSound', startSound);
    }

    create() {
        this.add.image(500, 320, 'logo');
        this.input.keyboard.createCursorKeys();
        this.cursor = this.add.sprite(300, 510, 'tanksPlr');
        this.cursor.angle = 90;
        this.anims.create({
            // ----------------- создание анимации движени гусениц курсора
            key: 'tank',
            frames: this.anims.generateFrameNames('tanksPlr', { prefix: 'player_2_main_', start: 1, end: 2 }),
            repeat: -1,
        });

        this.input.keyboard.on('keydown', (event: { key: string }) => {
            // ------------------ перемещение курсора при нажатии вверх и вниз, при нажатии пробела выбор
            if (event.key === 'ArrowDown') {
                this.cursor.y = 565;
            } else if (event.key === 'ArrowUp') {
                this.cursor.y = 510;
            } else if (event.key === ' ' && this.cursor.y === 510) {
                console.log('Start Game');
                this.scene.start('GameScene');
                // this.sound.add('startSound').play(); // звук начала игры
            } else if (event.key === ' ' && this.cursor.y === 565) {
                console.log('Construction');
            } else if (event.key === 'p') {
                // ------- Инструмент разработчика. Переключатель сцен на англ. 'p'
                this.scene.start('ScoreScene');
            }
        });
    }

    update() {
        this.cursor.anims.play('tank', true); // запуск анимации
    }
}
export default StartScene;
