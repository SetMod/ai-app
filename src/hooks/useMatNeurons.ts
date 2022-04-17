import IPreset from "@/interfaces/IPreset";
import ISignals from "@/interfaces/ISignals";
import MatNeuron from "@/models/MatNeuron";
import { computed, reactive, ref } from "vue";

export interface IMatNeuronsOptions {
    signals: ISignals
    matNeuronAmount: number
    eta: number
}

export default function useMatNeurons(matNeuronOptions: IMatNeuronsOptions) {
    const { signals, matNeuronAmount, eta } = matNeuronOptions
    const matNeurons = reactive(Array.from({ length: matNeuronAmount }, (_, index) => {
        return new MatNeuron(signals.inputs, signals.weights[index], index, eta)
    }))
    const localVariant = ref("lb3")

    const results = reactive({
        iterations: new Array<number>(matNeuronAmount),
        predictions: new Array<number>(matNeuronAmount),
        sigmas: new Array<number>(matNeuronAmount),
        epsilons: new Array<number>(matNeuronAmount),
        deltas: new Array<number>(matNeuronAmount),
    })

    const neuronLearn = (presets: Array<IPreset>, variant: string = localVariant.value) => {
        localVariant.value = variant;
        const start = Date.now();

        matNeurons.forEach((neuron, i) => {
            neuron.learn(presets, variant)
            results.predictions[i] = selectPrediction(neuron, [], variant)
            results.sigmas[i] = neuron.predictSigma()
            results.iterations[i] = neuron.iterations
            results.epsilons[i] = neuron.epsilon
            results.deltas[i] = neuron.delta
        })

        const duration = Date.now() - start;
        console.log(`\n\nExecution time: ${duration}ms | ${duration / 1000}s`);

    }

    const selectPrediction = (neuron: MatNeuron, inputs: number[] = [], variant: string) => {
        switch (variant) {
            case "lb4":
                return neuron.predictSigma(inputs)
            default:
                return neuron.predictStep(inputs)
        }
    }

    const neuronResult = computed(() => {
        matNeurons.forEach((neuron, i) => {
            results.predictions[i] = selectPrediction(neuron, signals.inputs, localVariant.value)
            results.sigmas[i] = neuron.predictSigma()
            results.iterations[i] = neuron.iterations
            results.epsilons[i] = neuron.epsilon
            results.deltas[i] = neuron.delta
        })
        const maxVal = Math.max(...results.predictions)
        return results.predictions.indexOf(maxVal)
    });
    return {
        matNeurons,
        results,
        neuronResult,
        neuronLearn
    }
}