import { generateRandomArray } from "@/helpers/generateInputs";
import { ILayerOptions } from "@/models/MatNeuronLayer";
import { MatNeuronLayers } from "@/models/MatNeuronLayers";
import { ref } from "vue";

export interface IMatNeuronsOptions {
    layersOptions: ILayerOptions[]
    inputLayerAmount: number
    variant: string
}

export default function useMatNeuronLayers(options: IMatNeuronsOptions) {
    const { layersOptions, inputLayerAmount, variant } = options
    const layers = ref(new MatNeuronLayers(layersOptions))
    const inputs = generateRandomArray({
        arrayAmount: 1,
        arrayLength: inputLayerAmount,
        numberRange: { min: 0, max: 1, precision: 1 }
    })[0]
    layers.value.initLayers(inputs, variant)
    return {
        layers,
    }
}