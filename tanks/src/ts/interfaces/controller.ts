import ITank from './tank';

interface IController {
    readonly tank: ITank;

    destroy: () => void;
}

export default IController;
