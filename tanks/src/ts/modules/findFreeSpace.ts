import Phaser from 'phaser';
import { randIntFrZ } from './functions';

function setFinderEmpty(map: Phaser.Tilemaps.Tilemap) {
    const { width, height, tileWidth } = map;

    const { data } = map.layers[0];

    const checkXY = (x: number, y: number) => data[y][x].index === -1;

    const result: { x: number; y: number }[] = [];
    for (let i = 0; i < height; i += 2) {
        for (let j = 0; j < width; j += 2) {
            if (checkXY(i, j) && checkXY(i + 1, j) && checkXY(i, j + 1) && checkXY(i + 1, j + 1)) {
                const x = (j + 3) * tileWidth; // * size * 2 + size;
                const y = (i + 3) * tileWidth; // * size * 2 + size;
                result.push({ x, y });
            }
        }
    }

    const { length } = result;

    return () => result[randIntFrZ(length - 1)];
}

export default setFinderEmpty;
