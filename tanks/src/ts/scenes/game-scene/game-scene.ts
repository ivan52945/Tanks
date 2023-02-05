import sprites from '../../../assets/images/sprites.png';
import spritesJSON from '../../../assets/images/sprites.json';

type Keys = Phaser.Types.Input.Keyboard.CursorKeys;
type Entity = Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

class GameScene extends Phaser.Scene {
    keys: unknown;

    private keyboard: Keys;

    private player: Entity;

    constructor() {
        super('Game');
    }

    preload() {
        this.load.atlas('tanks', sprites, spritesJSON);
    }

    create() {
        this.keyboard = this.input.keyboard.createCursorKeys();
        this.player = this.physics.add.sprite(50, 50, 'tanks', 'gold_player_1');

        this.anims.create({
            key: 'goldRun',
            frames: this.anims.generateFrameNames('tanks', { prefix: 'gold_player_', start: 1, end: 2 }),
            repeat: -1,
        });
    }

    update() {
        if (this.keyboard.left.isDown) {
            this.player.x -= 3;
            this.player.angle = 270;
            this.player.anims.play('goldRun', true);
        } else if (this.keyboard.right.isDown) {
            this.player.x += 3;
            this.player.anims.play('goldRun', true);
            this.player.angle = 90;
        } else if (this.keyboard.down.isDown) {
            this.player.y += 3;
            this.player.anims.play('goldRun', true);
            this.player.angle = 180;
        } else if (this.keyboard.up.isDown) {
            this.player.y -= 3;
            this.player.anims.play('goldRun', true);
            this.player.angle = 0;
        } else {
            this.player.anims.stop();
        }
    }
}
export default GameScene;
