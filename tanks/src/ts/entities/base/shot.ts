import Entity from './entity';

class Shot extends Entity {
    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        key: string,
        direction: number,
        atlasSprite?: string | number
    ) {
        super(scene, x, y, 'shot', 'shotImge');
    }
}

export default Shot;
