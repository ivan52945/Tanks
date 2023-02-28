export function randIntFrZ(to: number) {
    const random = Math.random() * (to + 1);
    return Math.floor(random);
}

/**
 * Function calculates the cos for a 90-degree left rotated and mirrored coordinate system
 *
 * @param {dir:  number} dir
 *
 */

export function fCos(dir: number) {
    dir %= 4;

    if (dir === 1) return 1;
    if (dir === 3) return -1;
    return 0;
}

/**
 * Function calculates the sin for a 90-degree left rotated and mirrored coordinate system
 *
 * @param {dir:  number} dir
 *
 */

export function fSin(dir: number) {
    dir %= 4;

    if (dir === 0) return -1;
    if (dir === 2) return 1;
    return 0;
}

/**
 * Function shuffle
 *
 * @param {array: any[]} array source
 *
 * @return shuffled array
 */

export function shuffle<T>(array: T[]) {
    const src = array.slice();

    for (let i = src.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [src[i], src[j]] = [src[j], src[i]];
    }

    return src;
}
