import { GameObjects } from 'phaser';

class Entity extends Phaser.Physics.Arcade.Sprite {
    protected direction = 0;

    constructor(scene: Phaser.Scene, x: number, y: number, type: string, key: string, atlasSprite?: string) {
        super(scene, x, y, key, atlasSprite);

        console.log(key, atlasSprite);
        this.scene = scene;
        this.scene.add.existing(this);

        this.scene.physics.add.existing(this, false);

        this.enableBody(false, 0, 0, true, true);

        this.setData('type', type);
        this.setData('isDead', false);
    }
}

export default Entity;
