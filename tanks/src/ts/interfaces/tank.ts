import Shot from '../entities/base/shot';

interface ITank {
    sideBad: boolean;
    manual?: boolean;

    shot: () => void;
    move: (dir: number) => void;
    update: () => void;
    stopMove: () => void;

    getShot: (shot: Shot) => void;
}
export default ITank;
