import IInputs from "./IInputs";
import IPresets from "./IPresets";

export default interface INeuron {
    inputs: IInputs;
    Sum: number;
    teta: number;
    iterations: number;
    result: () => number;
    learn: (presets: IPresets) => void;
}