import Entity from './entity';

class Shot extends Entity {
    // SHOT_DELAY: number;
    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        key: string,
        direction: number,
        atlasSprite?: string | number
    ) {
        super(scene, x, y, 'shot', 'shotImge');
        // this.SHOT_DELAY = 300;
    }
}

export default Shot;
