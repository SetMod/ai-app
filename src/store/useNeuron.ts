import IInputs from "@/interfaces/IInputs";
import Neuron from "@/models/Neuron";
import { computed, ref } from "vue";

export default function useNeuron(inputs: IInputs, teta: number, desiredResult?: number) {
    const neuron = ref(new Neuron(inputs, teta))
    const iterations = computed(() => {
        return neuron.value.iterations
    })
    const result = computed(() => {
        return neuron.value.result();
    });
    const epsilon = computed(() => {
        if (desiredResult) {
            return desiredResult - result.value;
        }
        return result.value
    });
    // const des = computed(() => {
    //     if (epsilon.value > 0) {
    //         return '4.b'
    //     } else if (epsilon.value < 0) {
    //         return '4.v'
    //     }
    //     return '4.a'
    // })
    return {
        neuron,
        result,
        epsilon,
        iterations,
    }
}
