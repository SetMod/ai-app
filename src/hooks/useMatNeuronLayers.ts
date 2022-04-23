import ISignals from "@/interfaces/ISignals";
import { ILayerOptions } from "@/models/MatNeuronLayer";
import { MatNeuronLayers } from "@/models/MatNeuronLayers";
import { computed, ref } from "vue";

export interface IMatNeuronsOptions {
    layersOptions: ILayerOptions[]
    signals: ISignals
    variant: string
}

export default function useMatNeuronLayers(options: IMatNeuronsOptions) {
    const { layersOptions, signals, variant } = options
    const layers = ref(new MatNeuronLayers(layersOptions))
    layers.value.initLayers(signals.getInputs(), variant)
    const results = computed(() => {
        return layers.value.predict(signals.inputs)
    })
    return {
        layers,
        results
    }
}