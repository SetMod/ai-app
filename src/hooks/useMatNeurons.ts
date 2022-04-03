import IPreset from "@/interfaces/IPreset";
import ISignals from "@/interfaces/ISignals";
import MatNeuron from "@/models/MatNeuron";
import { computed, reactive } from "vue";

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
    const results = reactive({
        iterations: new Array(matNeuronAmount),
        predictions: new Array(matNeuronAmount),
        sigmas: new Array(matNeuronAmount),
        epsilons: new Array(matNeuronAmount),
        epsilon: 0
    })

    const neuronLearn = (presets: Array<IPreset>, lb: string = "lb3") => {
        const start = Date.now();
        matNeurons.forEach((neuron, i) => {
            neuron.learn(presets, lb)
            results.iterations[i] = neuron.iterations
            results.epsilons[i] = neuron.epsilon
            results.predictions[i] = neuron.predict()
            results.sigmas[i] = neuron.predictSigma()
        })
        results.epsilons.forEach((epsilon) => {
            results.epsilon += epsilon ^ 2
        })
        results.epsilon = results.epsilon * 0.5
        const duration = Date.now() - start;
        console.log(`\n\nExecution time: ${duration}ms | ${duration / 1000}s`);

    }
    const neuronResult = computed(() => {
        let id = 0
        matNeurons.forEach((neuron, i) => {
            results.iterations[i] = neuron.iterations
            results.predictions[i] = neuron.predict(signals.inputs)
            if (results.predictions[i])
                id = neuron.id
        })
        return id;
    });
    return {
        matNeurons,
        results,
        neuronResult,
        neuronLearn
    }
}