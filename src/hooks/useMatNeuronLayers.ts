import ISignals from "@/interfaces/ISignals";
import { ILayerOptions } from "@/models/MatNeuronLayer";
import { MatNeuronLayers } from "@/models/MatNeuronLayers";
import { computed, ref } from "vue";

export interface IMatNeuronsOptions {
    layersOptions: ILayerOptions[]
    signals: ISignals
}

export default function useMatNeuronLayers(options: IMatNeuronsOptions) {
    const { layersOptions, signals } = options
    const layers = ref(new MatNeuronLayers(layersOptions))
    layers.value.initLayers(signals.getInputs())
    const results = computed(() => {
        return layers.value.predict(signals.inputs)
    })
    return {
        layers,
        results
    }
}