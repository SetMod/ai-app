import IPreset from "@/interfaces/IPreset"
import MatNeuron, { ILearnOptions } from "./MatNeuron"

export interface IMatNeurons {
    neurons: MatNeuron[]
    initNeurons(inputs: number[], weights: number[][], variant: string): void
    learn(presets: Array<IPreset>, options: ILearnOptions): void
    predict(inputs: number[]): number
    errorMeanSquare(presets: IPreset[]): number
}

export class MatNeurons implements IMatNeurons {
    neurons: MatNeuron[] = []
    log: boolean = true

    constructor(neuronAmount: number) {
        this.neurons.length = neuronAmount
    }

    initNeurons(inputs: number[], weights: number[][], variant: string): void {
        for (let neuronIndex = 0; neuronIndex < this.neurons.length; neuronIndex++) {
            const neuron = new MatNeuron(inputs, weights[neuronIndex], variant, neuronIndex)
            this.neurons[neuronIndex] = neuron
        }
    }

    learn(presets: Array<IPreset>, options: ILearnOptions): void {
        const { errorThreshold, eta, maxIterations, variant } = options
        this.print('\nLearn options:', options);
        this.print('\nStarting learning...');

        const start = Date.now();
        let iteration = 0
        while (iteration < maxIterations) {
            let isPredictionsCorrect = true
            presets.forEach((preset) => {
                this.neurons.forEach((neuron) => {
                    const isCorrect = neuron.learnOnPreset(preset, undefined, { eta, variant })
                    if (!isCorrect && isPredictionsCorrect)
                        isPredictionsCorrect = false
                })
            })

            if (isPredictionsCorrect) break

            const error = this.errorMeanSquare(presets)
            this.print(`iteration[${iteration}]: error=${error}; threshold=${errorThreshold}`);
            if (error <= errorThreshold) break

            iteration++
        }

        this.print('\nLearning done!');
        const duration = Date.now() - start;
        this.print(`\n\nExecution time: ${duration}ms | ${duration / 1000}s`);
    }

    predict(inputs: number[]): number {
        this.neurons.forEach((neuron) => {
            neuron.setInputs(inputs)
            neuron.predict()
        })
        const neuron = this.neurons.reduce((pevNeuron, neuron) => { return pevNeuron.prediction > neuron.prediction ? pevNeuron : neuron })
        return neuron.id
    }

    errorMeanSquare(presets: IPreset[]): number {
        const Q = presets.length
        const M = this.neurons.length
        const errorSum = presets.reduce((totalQ, preset) => {
            this.predict(preset.inputs)
            const errorSum = this.neurons.reduce((totalM, neuron) => {
                const desired = preset.value === neuron.id ? 1 : 0
                return totalM += Math.pow(desired - neuron.prediction, 2)
            }, 0)
            return totalQ += errorSum
        }, 0)
        return ((1 / (Q * M)) * errorSum)
    }

    print(...data: any[]): void {
        if (this.log) console.log(...data);
    }
}