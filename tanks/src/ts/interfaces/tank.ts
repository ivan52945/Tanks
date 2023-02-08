interface ITank {
    manual?: boolean;

    update: () => void;
    move: (direction: number) => void;
    shot: () => void;
}
export default ITank;
