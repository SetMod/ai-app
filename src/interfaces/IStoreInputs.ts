import IInputs from "./IInputs";

interface IStoreInputs {
    value: IInputs[];
    setInputs(value: Array<IInputs>): void;
    setReverseInput(index: number): void;
    increaseWeights(): void;
    decreaseWeights(): void;
    setX(x: number[]): void;
    getInputs(): number[];
    resetInputs(): void;
}

export default IStoreInputs