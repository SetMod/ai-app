<template>
  <section>
    <div class="container">
      <h2>Neuron</h2>
      <section class="flex">
        <PresetsList :signals="signals" :presets="presets" />
        <div>
          <div class="flex">
            Result is :
            <span class="result">{{ neuronResult ? "even" : "odd" }}</span>
          </div>
          <div>Iterations: {{ matNeuron.iterations }}</div>
          <button class="learn" @click="matNeuron.learnOnPresets(presets.presets)">Learn</button>
        </div>
      </section>

      <InputsDraw :signals="signals" />
      <InputsList :signals="signals" />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import InputsList from "@/components/InputsList.vue";
import InputsDraw from "@/components/InputsDraw.vue";
import PresetsList from "@/components/PresetsList.vue";
import usePresets from "@/hooks/usePresets";
import useSignals, { ISignalsOptions } from "@/hooks/useSignals";
import useMatNeuron, { IMatNeuronOptions } from "@/hooks/useMatNeuron";

export default defineComponent({
  components: {
    InputsList,
    InputsDraw,
    PresetsList,
  },
  setup() {
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
        arrayAmount: 1,
        numberRange: {
          min: -1,
          max: 1,
          precision: 1
        }
      }
    }));
    const { presets } = usePresets();
    const { matNeuron, neuronResult } = useMatNeuron(reactive<IMatNeuronOptions>({
      signals: signals.value,
    }))

    return {
      neuronResult,
      signals,
      presets,
      matNeuron,
    };
  },
});
</script>

<style>
</style>