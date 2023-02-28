/**
 * Base class for all entities
 *
 * @param {Phaser.Scene} scene scene
 * @param {number} x x of position
 * @param {number} y y of position
 * @param {string} type type of entity. can be used for next processing
 * @param {string | Phaser.Textures.Texture} key link to texture image or image
 * @param {string | number} atlasSprite link to tile in atlas
 *
 */

import IBattleScene from '../../interfaces/battle-scene';

class Entity extends Phaser.Physics.Arcade.Sprite {
    protected dir = 0;

    constructor(
        scene: IBattleScene,
        x: number,
        y: number,
        type: string,
        key: string | Phaser.Textures.Texture,
        atlasSprite?: string | number
    ) {
        super(scene, x, y, key, atlasSprite);

        this.scene = scene;
        this.scene.physics.world.enableBody(this, 0);
        this.scene.add.existing(this);
    }

    explozion(size: 'bigE' | 'e') {
        const exploze = this.scene.add.sprite(this.x, this.y, `${size}xplosion`);

        setTimeout(() => {
            exploze.destroy();
        }, 300.00000000001);
        this.scene.sound.add('explosionSound').play();
        exploze.play(`${size}xplodeAnimation`);
    }
}

export default Entity;
