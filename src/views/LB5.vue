<template>
  <section>
    <div class="container">
      <h2>Neuron</h2>

      <section>
        <div>
          <label>Speed:</label>
          <input
            v-model="learnOptions.eta"
            type="number"
            name="eta"
            id="eta"
            min="0.05"
            max="1"
            step="0.01"
          />
        </div>
        <button class="learn" @click="learn">Learn</button>
      </section>

      <section class="flex">
        <PresetsList
          :signals="signals"
          :presets="presets"
          :desiredResults="desiredResults"
        />
        <section>
          <div class="flex">
            Result is :
            <span class="result">{{ desiredResults[results].name }}</span>
          </div>
        </section>
      </section>

      <InputsDraw :signals="signals" />
    </div>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from "vue";
import { generateDesiredResults } from "@/helpers/generateInputs";
import InputsDraw from "@/components/InputsDraw.vue";
import PresetsList from "@/components/PresetsList.vue";
import usePresets from "@/hooks/usePresets";
import useSignals, { ISignalsOptions } from "@/hooks/useSignals";
import useMatNeuronLayers from "@/hooks/useMatNeuronLayers";
import { ILearnOptions } from "@/models/MatNeuron";

export default defineComponent({
  components: {
    InputsDraw,
    PresetsList,
  },
  setup() {
    const desiredResults = generateDesiredResults();
    const matNeuronAmount = desiredResults.length;
    const inputLayerAmount = 36;
    const outputLayerAmount = desiredResults.length;
    const { signals } = useSignals(
      reactive<ISignalsOptions>({
        arrayLength: inputLayerAmount,
        inputs: {
          arrayAmount: 1,
          numberRange: {
            min: 0,
            max: 1,
            precision: 1,
          },
        },
        weights: {
          arrayAmount: matNeuronAmount,
          numberRange: {
            min: -1,
            max: 1,
            precision: 1,
          },
        },
      })
    );
    const { presets } = usePresets();
    const { layers } = useMatNeuronLayers({
      variant: "lb5",
      inputLayerAmount: inputLayerAmount,
      outputLayerAmount: outputLayerAmount,
      layersOptions: [{ neuronAmount: 10 }, { neuronAmount: 10 }],
    });
    const results = computed(() => {
      return layers.value.predict(signals.value.inputs);
    });
    const learnOptions = ref<ILearnOptions>({
      variant: "lb5",
      eta: 1,
      maxIterations: 100,
      errorThreshold: 0.005,
    });
    const learn = () => {
      layers.value.learn(presets.value.presets, learnOptions.value);
    };
    return {
      results,
      signals,
      presets,
      learnOptions,
      desiredResults,
      learn,
    };
  },
});
</script>

<style>
</style>