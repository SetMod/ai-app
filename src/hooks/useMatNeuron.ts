import ISignals from "@/interfaces/ISignals";
import MatNeuron from "@/models/MatNeuron";
import { computed, ref } from "vue";

export interface IMatNeuronOptions {
    signals: ISignals
}

export default function useMatNeuron(matNeuronOptions: IMatNeuronOptions) {
    const { signals } = matNeuronOptions
    const matNeuron = ref(new MatNeuron(signals.inputs, signals.weights[0], 0))
    const neuronResult = computed(() => {
        return matNeuron.value.predictStep(signals.inputs);
    });
    return {
        matNeuron,
        neuronResult,
    }
}