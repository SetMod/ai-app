export default interface ISignals {
    inputs: Array<number>
    weights: Array<Array<number>>
    setInputs(inputs: Array<number>): void
    getInputs: () => number[];
    setWeights(weights: Array<Array<number>>): void
    setWeightsByIndex(weights: number[], weightsIndex: number): void
    setSignal(signal: ISignals): void;
    setReverseInput(index: number): void;
    resetInputs(): void;
}