type Keys = Phaser.Types.Input.Keyboard.CursorKeys;
type Group = Phaser.Physics.Arcade.Group;

type FabticConfig = {
    coords: {
        x: number;
        y: number;
    }[];
    plan: string[];
};

export { Keys, Group, FabticConfig };
