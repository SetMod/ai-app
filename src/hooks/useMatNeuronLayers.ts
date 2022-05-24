import { ILayerOptions } from "@/models/MatNeuronLayer";
import { MatNeuronLayers } from "@/models/MatNeuronLayers";
import { ref } from "vue";

export interface IMatNeuronsOptions {
    layersOptions: ILayerOptions[]
    inputLayerAmount: number
    outputLayerAmount: number
    variant: string
}

export default function useMatNeuronLayers(options: IMatNeuronsOptions) {
    const { layersOptions, inputLayerAmount, outputLayerAmount, variant } = options
    const layers = ref(new MatNeuronLayers(layersOptions))
    layers.value.initLayers(inputLayerAmount, outputLayerAmount, layersOptions, variant)
    return {
        layers,
    }
}