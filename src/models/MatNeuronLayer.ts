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
    initHiddenLayer: (inputs: number[], prevLayer?: MatNeuronLayer) => void
    forwardRun: (inputs: number[], prevLayer?: MatNeuronLayer) => void
    backPropagate: (preset: IPreset, prevLayer: MatNeuronLayer, options: { eta: number, variant: string }) => void
}

export class MatNeuronLayer implements IMatNeuronLayer {
    neurons: MatNeuron[] = []
    id: number = 0

    constructor(layerOptions: ILayerOptions, id: number) {
        this.neurons.length = layerOptions.neuronAmount
        this.id = id
    }

    initHiddenLayer(inputs: number[], prevLayer?: MatNeuronLayer): void {

        const weights = generateRandomArray({
            arrayAmount: this.neurons.length,
            arrayLength: prevLayer ? prevLayer.neurons.length : inputs.length,
            numberRange: { min: -1, max: 1, precision: 10 }
        })

        for (let i = 0; i < this.neurons.length; i++) {

            if (this.id === 0)
                this.neurons[i] = new MatNeuron(inputs, weights[i], i)
            else
                this.neurons[i] = new MatNeuron([], weights[i], i)
            this.neurons[i].variant = "lb5"
        }
    }

    forwardRun(inputs: number[], prevLayer?: MatNeuronLayer): void {
        for (let i = 0; i < this.neurons.length; i++) {
            if (this.id === 0) this.neurons[i].setInputs(inputs)
            else if (prevLayer)
                for (let j = 0; j < prevLayer.neurons.length; j++)
                    this.neurons[i].inputs[j] = prevLayer.neurons[j].prediction // sum weights by results (w*y)
            this.neurons[i].predictSigma() // sum weights by inputs (w*x)
            // console.log(`\tNeuron[${i}]: `, this.neurons[i].prediction);
        }
    }

    backPropagate(preset: IPreset, prevLayer?: MatNeuronLayer, options: { eta: number, variant: string } = { eta: 1, variant: 'lb5' }) {
        for (let i = 0; i < this.neurons.length; i++) {
            // console.log(`\nNeuron[${this.neurons[i].id}]:`);
            if (prevLayer) {
                const sum = prevLayer.neurons.reduce((total, neuron) => { return total += neuron.delta * neuron.weights[i] }, 0)
                // for (let j = 0; j < prevLayer.neurons.length; j++)
                //     sum += prevLayer.neurons[j].delta * prevLayer.neurons[j].weights[i]
                // console.log(`Sum: ${sum}`);

                this.neurons[i].learnOnPreset(preset, sum, options)
            } else
                this.neurons[i].learnOnPreset(preset, undefined, options) // learn output layer
        }
    }
}