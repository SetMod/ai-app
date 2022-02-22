import IInput from "./IInput";

export default interface IInputs {
    inputs: IInput[];
    setInputs(inputs: Array<IInput>): void;
    setReverseInput(index: number): void;
    increaseWeights(): void;
    decreaseWeights(): void;
    setX(x: number[]): void;
    getInputs(): number[];
    resetInputs(): void;
}
