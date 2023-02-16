function setFinderEmpty(w: number, h: number) {
    return function findFreeSpaceXY(array: [number]) {
        const aRes: [[number, number]] = [[0, 0]];
        array.forEach((element, i, arr) => {
            if (!arr[i] && !arr[i + 1] && !arr[i + 26] && !arr[i + 27]) {
                const x = (i % 26) * 32 + 64 + 32;
                const y = Math.floor(i / 26) + 64 + 32;
                aRes.push([x, y]);
            }
        });
        return aRes.splice(1, 0);
    };
}

export default setFinderEmpty;
