import IPreset from "@/interfaces/IPreset";
import IPresets from "@/interfaces/IPresets";
import Preset from "./Preset";

export default class Presets implements IPresets {
    presets: IPreset[];
    constructor() {
        this.presets = new Array<IPreset>()
    }
    setPresets(presets: IPreset[]) {
        this.presets = presets
    }
    getPreset(index: number): IPreset {
        try {
            return this.presets[index]
        } catch (error) {
            console.log(error);
            return new Preset(0, [])
        }
    }
    addPreset(preset: IPreset) {
        this.presets.push(preset);
        console.log(this.presets);
    }
    deletePreset(index: number) {
        try {
            this.presets.splice(index, 1);
        } catch (error) {
            console.log(error);
        }
    }
    resetPresets() {
        this.presets = new Array<IPreset>()
    }

}