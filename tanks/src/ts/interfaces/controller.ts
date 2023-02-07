interface IController {
    readonly callback: (direction: number) => void;

    update: () => void;
}

export default IController;
