import Phaser from 'phaser';

function setFinderEmpty(w: number, h: number, size: number, src: Phaser.Tilemaps.Tile[][]) {
    const checkXY = (x: number, y: number) => src[x][y].index === -1;

    return function findFreeSpaceXY() {
        const result: [number, number][] = [];
        for (let i = 0; i < h; i += 2) {
            for (let j = 0; j < w; j += 2) {
                if (checkXY(i, j) && checkXY(i + 1, j) && checkXY(i, j + 1) && checkXY(i + 1, j + 1)) {
                    const x = (j + 3) * size; // * size * 2 + size;
                    const y = (i + 3) * size; // * size * 2 + size;
                    result.push([x, y]);
                }
            }
        }
        /*
        array.forEach((element, i, arr) => {
            if (!arr[i] && !arr[i + 1] && !arr[i + 26] && !arr[i + 27]) {
                const x = (i % 26) * 32 + 64 + 32;
                const y = Math.floor(i / 26) + 64 + 32;
                aRes.push([x, y]);
            }
        });
        */
        return result;
    };
}

export default setFinderEmpty;
