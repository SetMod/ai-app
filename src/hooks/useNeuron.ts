import IInputs from "@/interfaces/IInputs";
import IPresets from "@/interfaces/IPresets";
import Neuron from "@/models/Neuron";
import { computed, ref } from "vue";

export interface INeuronOptions {
    inputs: IInputs,
    presets: IPresets
}

export default function useNeuron(options: INeuronOptions) {
    const neuron = ref(new Neuron(options.inputs))
    const neuronLearn = () => {
        neuron.value.learn(options.presets)
    }
    const neuronIterations = computed(() => {
        return neuron.value.iterations
    })
    const neuronResult = computed(() => {
        return neuron.value.result();
    });
    return {
        neuron,
        neuronLearn,
        neuronResult,
        neuronIterations
    }
}
