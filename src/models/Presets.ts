import IPreset from "@/interfaces/IPreset";
import IPresets from "@/interfaces/IPresets";

export default class Presets implements IPresets {
    presets: Array<IPreset>

    constructor() {
        this.presets = new Array<IPreset>()
    }

    setPresets(presets: Array<IPreset>) {
        this.presets = presets
    }

    getPreset(index: number): IPreset {
        return this.presets[index]
    }

    addPreset(preset: IPreset) {
        this.presets.push(preset);
    }

    deletePreset(index: number) {
        this.presets.splice(index, 1);
    }

    resetPresets() {
        this.presets = new Array<IPreset>()
    }
}