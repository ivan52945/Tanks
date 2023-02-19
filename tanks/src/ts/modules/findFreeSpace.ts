import Phaser from 'phaser';
import tilemap1 from '../../assets/maps/tilemap1.json'
import { randIntFrZ } from './functions';

function setFinderEmpty(map: Phaser.Tilemaps.Tilemap) {
    const { width, height, tileWidth } = map;

    const layers = map.layers;

    const summLayers = new Array(height).fill(new Array(width).fill(0));

    for (let iL = 0; iL < layers.length; iL += 1) {

    }
    /*
        const summLayers = layers[0].data.map((el, i) => { // сложение массивов
            return tilemap.layers[0].data[i] + tilemap.layers[1].data[i]
        })
        */
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
    });

    coordArr.splice(0, 1)

    return coordArr[randIntFrZ(coordArr.length - 1)]
}

export default setFinderEmpty;
