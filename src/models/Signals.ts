import ISignals from "@/interfaces/ISignals";


export default class Signals implements ISignals {
    inputs: number[];
    weights: number[][];

    constructor(inputs: number[], weights: number[][]) {
        this.inputs = inputs
        this.weights = weights
    }

    setInputs(inputs: number[]): void {
        for (let index = 0; index < this.inputs.length; index++) {
            this.inputs[index] = inputs[index]
        }
        // this.inputs = inputs
    }
    getInputs() {
        return [...this.inputs]
    }
    setWeights(weights: number[][]): void {
        this.weights = weights
    }
    setWeightsByIndex(weights: number[], weightsIndex: number): void {
        if (this.weights.length > weightsIndex) {
            if (this.weights[weightsIndex].length) {
                this.weights[weightsIndex] = weights
            } else {
                const inptLen = this.inputs.length
                const wghtLen = weights.length
                console.log(`[WARNING] Length of inputs and weights doesn't math ${inptLen} != [${wghtLen}!`);
            }
        } else {
            console.log(`[WARNING] Weights with index = ${weightsIndex} doesn't exists!`);
        }

    }
    setSignal(signal: ISignals): void {
        this.inputs = signal.inputs
        this.weights = signal.weights
    }
    setReverseInput(index: number): void {
        if (this.inputs.length > index && index != 0) {
            if (this.inputs[index]) {
                this.inputs[index] = 0
            } else {
                this.inputs[index] = 1
            }
        }
    }
    resetInputs(): void {
        for (let index = 0; index < this.inputs.length; index++) {
            if (index !== 0)
                this.inputs[index] = 0
        }
    }

}