import ITank from './tank';

interface IController {
    readonly tank: ITank;

    destroy: () => void;

    freeze?: () => void;
}

export default IController;
