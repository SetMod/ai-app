import IPreset from "@/interfaces/IPreset";

export default class Preset implements IPreset {
    value: number;
    inputs: number[];

    constructor(value: number, inputs: number[]) {
        this.value = value
        this.inputs = inputs
    }
}