import IPreset from "@/interfaces/IPreset"
import { ILayerOptions, MatNeuronLayer } from "./MatNeuronLayer"

export interface ILayersLearnOptions {
    variant: string
    errorThreshold: number
    maxIterations: number
    eta: number
}

export interface IMatNeuronLayers {
    layers: MatNeuronLayer[]
    layersOptions: ILayerOptions[]
    log: boolean
    initLayers: (inputs: number[], variant: string) => void
    learn: (presets: Array<IPreset>, options: ILayersLearnOptions) => void
    forwardRun: (inputs: number[]) => void
    backPropagation: (preset: IPreset, options: { eta: number, variant: string }) => void
    predict: (inputs: number[]) => number
    errorMeanSquare: (presets: IPreset[], outputLayer: MatNeuronLayer) => number
    errorMaxDiff: (presets: IPreset[], outputLayer: MatNeuronLayer) => number
}

export class MatNeuronLayers implements IMatNeuronLayers {
    layers: MatNeuronLayer[] = []
    layersOptions: ILayerOptions[] = []
    log: boolean = true

    constructor(layersOptions: ILayerOptions[]) {
        this.layers.length = layersOptions.length
        this.layersOptions = layersOptions
    }

    initLayers(inputs: number[] = [], variant: string): void {
        this.print('Initializing layers:');
        this.print(`Layers amount: ${this.layers.length}`);

        for (let layerId = 0; layerId < this.layers.length; layerId++) {
            const layerOptions = this.layersOptions[layerId]
            const layer = new MatNeuronLayer(layerOptions, layerId)
            const prevLayer = this.layers[layerId - 1]

            layer.initHiddenLayer(inputs, variant, prevLayer)
            this.layers[layerId] = layer
        }
        // this.printLayers()
    }

    learn(presets: Array<IPreset>, options: ILayersLearnOptions): void {
        this.print('\nLearn options:', options);
        this.print('\nStarting learning...');
        const { errorThreshold, eta, maxIterations, variant } = options
        const start = Date.now();
        let iteration = 0
        while (iteration < maxIterations) {
            presets.forEach((preset, q) => {
                // this.print(`Preset[${q}]: `, preset);
                this.forwardRun(preset.inputs)
                this.backPropagation(preset, { eta, variant })
            })
            const outputLayer = this.getOutputLayer()
            const error = this.errorMeanSquare(presets, outputLayer)
            this.print(`iteration[${iteration}]: error=${error}; threshold=${errorThreshold}`);
            if (error <= errorThreshold) break

            // const errorMaxDiff = this.errorMaxDiff(presets, outputLayer)
            // this.print(`iteration[${iteration}]: errorMaxDiff=${errorMaxDiff} threshold=${options.errorThreshold}`);
            // if (errorMaxDiff <= options.errorThreshold) break

            iteration++
        }

        this.print('\nLearning done!');
        const duration = Date.now() - start;
        this.print(`\n\nExecution time: ${duration}ms | ${duration / 1000}s`);
    }

    forwardRun(inputs: number[]): void {
        // this.print('\nForward run:');
        for (let layerIndex = 0; layerIndex < this.layers.length; layerIndex++) {
            // this.print(`\nLayer[${layerIndex}]: `, this.layers[layerIndex]);
            const prevLayer = this.layers[layerIndex - 1]
            this.layers[layerIndex].forwardRun(inputs, prevLayer)
        }
    }

    backPropagation(preset: IPreset, options: { eta: number, variant: string }): void {
        // this.print('\nBack propagation:');
        for (let layerIndex = this.layers.length - 1; layerIndex >= 0; layerIndex--) {
            // this.print(`\nLayer[${layerIndex}]: `, this.layers[layerIndex]);
            const prevLayer = this.layers[layerIndex + 1]
            this.layers[layerIndex].backPropagate(preset, prevLayer, options)
        }
    }

    errorMeanSquare(presets: IPreset[], outputLayer: MatNeuronLayer): number {
        const Q = presets.length
        const M = outputLayer.neurons.length
        const errorSum = presets.reduce((totalQ, preset) => {
            this.predict(preset.inputs)
            const errorSum = outputLayer.neurons.reduce((totalM, neuron) => {
                const desired = preset.value === neuron.id ? 1 : 0
                return totalM += Math.pow(desired - neuron.prediction, 2)
            }, 0)
            return totalQ += errorSum
        }, 0)
        return ((1 / (Q * M)) * errorSum)
    }

    errorMaxDiff(presets: IPreset[], outputLayer: MatNeuronLayer): number {
        const maxDiff = presets.reduce((max, preset) => {
            this.predict(preset.inputs)
            const maxVal = Math.max(...outputLayer.neurons.map((neuron) => {
                const desired = preset.value === neuron.id ? 1 : 0
                return Math.abs(desired - neuron.prediction)
            }))
            return maxVal > max ? maxVal : max
        }, 0)
        return maxDiff
    }

    predict(inputs: number[]): number {
        this.forwardRun(inputs)
        const outputLayer = this.getOutputLayer()
        const neuron = outputLayer.neurons.reduce((pevNeuron, neuron) => { return pevNeuron.prediction > neuron.prediction ? pevNeuron : neuron })

        return neuron.id
    }

    getOutputLayer(): MatNeuronLayer {
        return this.layers[this.layers.length - 1]
    }

    printLayers(): void {
        for (let i = 0; i < this.layers.length; i++) {
            this.print(`Layer[${this.layers[i].id}]:`, this.layers[i]);
            this.layers[i].neurons.forEach((neuron) => {
                this.print(`\tNeuron[${neuron.id}]:`, neuron);
            })
        }
    }

    print(...data: any[]): void {
        if (this.log) console.log(...data);
    }
}