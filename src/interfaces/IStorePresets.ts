import IPresets from "./IPresets";

interface IStorePresets {
    value: Array<IPresets>;
    setPresets: (value: IPresets[]) => void;
    getPreset: (index: number) => IPresets;
    addPreset: (preset: IPresets) => void;
    deletePreset: (index: number) => void;
    resetPresets: () => void;
}

export default IStorePresets