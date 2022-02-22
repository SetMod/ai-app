import IPreset from "@/interfaces/IPreset";

export default class Preset implements IPreset {
    inputs: number[];
    result: number;

    constructor(result: number, inputs: number[]) {
        this.result = result
        this.inputs = inputs
    }
}