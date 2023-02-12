import Shot from '../entities/base/shot';

interface ITank {
    sideBad: boolean;
    manual?: boolean;

    update: () => void;
    move: (dir: number) => void;
    shot: () => void;

    getShot: (shot: Shot) => void;
}
export default ITank;
