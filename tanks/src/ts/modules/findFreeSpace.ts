function setFinderEmpty(w: number, h: number, size: number) {
    return function findFreeSpaceXY(src: [number]) {
        const result: [number, number][] = [];
        for (let i = 0; i < h; i += 2) {
            for (let j = 0; j < w; j += 2) {
                if (!src[i * h + j] && !src[(i + 1) * h + j] && !src[i * h + j + 1] && !src[(i + 1) * h + j + 1]) {
                    const x = i + size;
                    const y = j + size;
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
