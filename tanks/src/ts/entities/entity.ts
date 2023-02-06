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

class Entity extends Phaser.Physics.Arcade.Sprite {
    protected direction = 0;

    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        type: string,
        key: string | Phaser.Textures.Texture,
        atlasSprite?: string | number
    ) {
        super(scene, x, y, key, atlasSprite);
        this.scene = scene;

        this.scene.add.existing(this);
        this.scene.physics.world.enableBody(this, 0);

        this.setData('type', type);
        this.setData('isDead', false);
    }
}

export default Entity;
