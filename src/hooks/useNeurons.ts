import IInputs from "@/interfaces/IInputs";
import INeuron from "@/interfaces/INeuron";
import IPresets from "@/interfaces/IPresets";
import Neuron from "@/models/Neuron";
import { computed, reactive } from "vue";
import { IDesiredResult } from "./useInputs";

export interface INeuronsOptions {
    presets: IPresets,
    inputsArray: Array<IInputs>,
    desiredResults: Array<IDesiredResult>
}

export default function useNeurons(options: INeuronsOptions) {
    const neuronsArray = reactive<Array<INeuron>>(new Array<INeuron>())
    options.inputsArray.forEach((inputs) => {
        neuronsArray.push(new Neuron(inputs))
    })
    const neuronsArrayLearn = () => {
        const results = [neuronsArray.length]
        const iterations = [neuronsArray.length]
        const epsilons = [neuronsArray.length]
        // const desiredId = 5
        neuronsArray.forEach((neuron, index) => {
            neuron.learn(options.presets)
            results[index] = neuron.result()
            iterations[index] = neuron.iterations
            epsilons[index] = neuron.epsilon
        })
    }

    const neuronsArrayResult = computed(() => {
        const results = [neuronsArray.length]
        neuronsArray.forEach((neuron, index) => {
            results[index] = neuron.result()
        })
        return results
    })
    const neuronsArrayIterations = computed(() => {
        const iterations = [neuronsArray.length]
        neuronsArray.forEach((neuron, index) => {
            iterations[index] = neuron.iterations
        })
        return iterations
    })
    return {
        neuronsArray,
        neuronsArrayLearn,
        neuronsArrayResult,
        neuronsArrayIterations
    }
}
