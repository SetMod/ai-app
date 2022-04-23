import { generateRandomArray } from "@/helpers/generateInputs"
import IPreset from "@/interfaces/IPreset"
import MatNeuron from "./MatNeuron"

export interface ILayerOptions {
    neuronAmount: number
    neuronWeightsNumberRange?: {
        min: number
        max: number
        precision?: number
    }
    // load already trained weights options
    //------------------------------
    // neuronWeightsLength: number
    // neuronWeights: number[][]
    // neuronWeightsAmount: number
}

export interface IMatNeuronLayer {
    neurons: MatNeuron[]
    id: number
    initHiddenLayer: (inputs: number[], variant: string, prevLayer?: MatNeuronLayer) => void
    forwardRun: (inputs: number[], prevLayer?: MatNeuronLayer) => void
    backPropagate: (preset: IPreset, prevLayer: MatNeuronLayer, options: { eta: number, variant: string }) => void
}

export class MatNeuronLayer implements IMatNeuronLayer {
    neurons: MatNeuron[] = []
    id: number = 0
    log: boolean = false

    constructor(layerOptions: ILayerOptions, id: number) {
        this.neurons.length = layerOptions.neuronAmount
        this.id = id
    }

    initHiddenLayer(inputs: number[], variant: string, prevLayer?: MatNeuronLayer): void {

        const weights = generateRandomArray({
            arrayAmount: this.neurons.length,
            arrayLength: prevLayer ? prevLayer.neurons.length : inputs.length,
            numberRange: { min: -1, max: 1, precision: 10 }
        })

        for (let i = 0; i < this.neurons.length; i++)
            this.neurons[i] = new MatNeuron(this.id === 0 ? inputs : [], weights[i], variant, i)
    }

    forwardRun(inputs: number[], prevLayer?: MatNeuronLayer): void {
        for (let i = 0; i < this.neurons.length; i++) {
            if (this.id === 0) this.neurons[i].setInputs(inputs)
            else if (prevLayer)
                for (let j = 0; j < prevLayer.neurons.length; j++)
                    this.neurons[i].inputs[j] = prevLayer.neurons[j].prediction // sum weights by results (w*y)
            this.neurons[i].predict() // sum weights by inputs (w*x)
            this.print(`\tNeuron[${i}]: `, this.neurons[i].prediction);
        }
    }

    backPropagate(preset: IPreset, prevLayer?: MatNeuronLayer, options: { eta: number, variant: string } = { eta: 1, variant: 'lb5' }) {
        for (let i = 0; i < this.neurons.length; i++) {
            this.print(`Neuron[${this.neurons[i].id}]:`, this.neurons[i]);
            if (prevLayer) {
                const sum = prevLayer.neurons.reduce((total, neuron) => { return total += neuron.delta * neuron.weights[i] }, 0)
                // for (let j = 0; j < prevLayer.neurons.length; j++)
                //     sum += prevLayer.neurons[j].delta * prevLayer.neurons[j].weights[i]
                this.print(`Sum: ${sum}`);
                this.neurons[i].learnOnPreset(preset, sum, options)
            } else
                this.neurons[i].learnOnPreset(preset, undefined, options) // learn output layer
        }
    }

    print(...data: any[]): void {
        if (this.log) console.log(...data);
    }
}