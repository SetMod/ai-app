import ISignals from "@/interfaces/ISignals";
import { MatNeurons } from "@/models/MatNeurons";
import { computed, ref } from "vue";

export interface IMatNeuronsOptions {
    signals: ISignals
    matNeuronAmount: number
    variant: string
}

export default function useMatNeurons(matNeuronOptions: IMatNeuronsOptions) {
    const { matNeuronAmount, signals, variant } = matNeuronOptions
    const neurons = ref(new MatNeurons(matNeuronAmount))
    neurons.value.initNeurons(signals.inputs, signals.weights, variant)
    const results = computed(() => {
        return neurons.value.predict(signals.inputs)
    })
    return {
        neurons,
        results
    }
}