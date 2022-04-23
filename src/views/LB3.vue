<template>
  <section>
    <div class="container">
      <h2>Neuron</h2>

      <section>
        <div>
          <label>Speed:</label>
          <input v-model="eta" type="number" name="eta" id="eta" min="0.05" max="1" step="0.01" />
        </div>
        <button class="learn" @click="neuronLearn(presets.presets, { variant: 'lb3' })">Learn</button>
      </section>

      <section class="flex">
        <PresetsList :signals="signals" :presets="presets" :desiredResults="desiredResults" />
        <section>
          <div class="flex">
            Result is :
            <span class="result">{{ desiredResults[neuronResult].name }}</span>
          </div>
          <p>Predictions: {{ results.predictions }}</p>
          <p>Iterations: {{ results.iterations }}</p>
        </section>
      </section>

      <InputsDraw :signals="signals" />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { generateDesiredResults } from "@/helpers/generateInputs";
import InputsDraw from "@/components/InputsDraw.vue";
import PresetsList from "@/components/PresetsList.vue";
import usePresets from "@/hooks/usePresets";
import useSignals, { ISignalsOptions } from "@/hooks/useSignals";
import useMatNeurons, { IMatNeuronsOptions } from "@/hooks/useMatNeurons";

export default defineComponent({
  components: {
    InputsDraw,
    PresetsList,
  },
  setup() {
    const desiredResults = generateDesiredResults()
    const matNeuronAmount = desiredResults.length
    const eta = ref(1)
    const { signals } = useSignals(reactive<ISignalsOptions>({
      arrayLength: 36,
      inputs: {
        arrayAmount: 1,
        numberRange: {
          min: 0,
          max: 1,
          precision: 1
        }
      },
      weights: {
        arrayAmount: matNeuronAmount,
        numberRange: {
          min: -1,
          max: 1,
          precision: 1
        }
      }
    }));
    const { presets } = usePresets();
    const { results, neuronLearn, neuronResult, } = useMatNeurons(reactive<IMatNeuronsOptions>({
      signals: signals.value,
      matNeuronAmount: matNeuronAmount,
    }))
    return {
      neuronResult,
      signals,
      presets,
      results,
      neuronLearn,
      eta,
      desiredResults,
    };
  },
});
</script>

<style>
</style>