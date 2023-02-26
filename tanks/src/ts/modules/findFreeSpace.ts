import tilemap1 from '../../assets/maps/tilemap1.json';
import { randIntFrZ } from './functions';

function setFinderEmpty(map: typeof tilemap1) {
    const { width, height, tilewidth } = map;

    const { layers } = map;

    function checkXY(x: number, y: number) {
        const i = y * height + x;

        let summLayers = 0;
        for (let iL = 0; iL < layers.length; iL += 1) {
            if (iL !== 2) summLayers += layers[iL].data[i];
        }

        if (summLayers > 0) {
            return false;
        }
        return true;
    }

    const result: { x: number; y: number }[] = [];

    for (let i = 0; i < height; i += 2) {
        for (let j = 0; j < width; j += 2) {
            if (checkXY(i, j) && checkXY(i + 1, j) && checkXY(i, j + 1) && checkXY(i + 1, j + 1)) {
                const x = (j + 3) * tilewidth; // * size * 2 + size;
                const y = (i + 3) * tilewidth; // * size * 2 + size;
                result.push({ x, y });
            }
        }
    }

    const count = result.length - 1;

    return () => result[randIntFrZ(count)];
}

export default setFinderEmpty;
