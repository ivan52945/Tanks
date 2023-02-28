import tilemap1 from '../../assets/maps/tilemap1.json';

function findSpawns(map: typeof tilemap1, layer: number) {
    const { width, height, tilewidth } = map;

    const { layers } = map;

    function checkXY(x: number, y: number) {
        const i = y * height + x;

        if (layers[layer].data[i] === 4) {
            return true;
        }
        return false;
    }

    const result: { x: number; y: number }[] = [];

    for (let i = 1; i < height; i += 2) {
        for (let j = 1; j < width; j += 2) {
            if (checkXY(j, i)) {
                const x = (j + 2) * tilewidth; // * size * 2 + size;
                const y = (i + 2) * tilewidth; // * size * 2 + size;
                result.push({ x, y });
            }
        }
    }

    return result;
}

export default findSpawns;
