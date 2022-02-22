import IPreset from "./IPreset";

export default interface IPresets {
    presets: Array<IPreset>;
    setPresets: (presets: IPreset[]) => void;
    getPreset: (index: number) => IPreset;
    addPreset: (preset: IPreset) => void;
    deletePreset: (index: number) => void;
    resetPresets: () => void;
}
