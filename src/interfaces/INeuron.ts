import IInputs from "./IInputs";
import IPresets from "./IPresets";

export default interface INeuron {
    inputs: IInputs;
    sum: number;
    iterations: number;
    epsilon: number;
    eta: number;
    result: () => number;
    learn: (presets: IPresets, desiredId?: number) => void;
}