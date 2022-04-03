<template>
  <section>
    <div class="container">
      <h2>Neuron</h2>
      <section>
        <div class="flex">
          <p>Result is :</p>
          <div
            class="result"
            :class="{
              result__green: !!result,
            }"
          >{{ result ? "even" : "odd" }}</div>
        </div>
        <button @click="even">Even</button>
        <button @click="odd">Odd</button>
      </section>
      <section>
        <button class="learn" @click="learn">Learn</button>
        <div>Iterations: {{ iterations }}</div>
        <!-- <PresetsList :inputs="inputs" :presets="presets" /> -->
      </section>

      <!-- <InputsDraw :inputs="inputs" /> -->
      <!-- <InputsList :inputs="inputs" /> -->
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import InputsList from "@/components/InputsList.vue";
import InputsDraw from "@/components/InputsDraw.vue";
import PresetsList from "@/components/PresetsList.vue";
import useInputs from "@/hooks/useInputs";
import usePresets from "@/hooks/usePresets";
import useNeuron, { INeuronOptions } from "@/hooks/useNeuron";
import Preset from "@/models/Preset";

export default defineComponent({
  components: {
    InputsList,
    InputsDraw,
    PresetsList,
  },
  setup() {
    const { inputs } = useInputs();
    const { presets } = usePresets();
    const neuronOptions = reactive<INeuronOptions>({
      inputs: inputs.value,
      presets: presets.value
    })
    const { neuronResult: result, neuronLearn: learn, neuronIterations: iterations } = useNeuron(neuronOptions);

    const even = () => {
      presets.value.addPreset(new Preset(1, inputs.value.getInputs()));
    };

    const odd = () => {
      presets.value.addPreset(new Preset(0, inputs.value.getInputs()));
    };

    return {
      result,
      inputs,
      iterations,
      presets,
      even,
      odd,
      learn,
    };
  },
});
</script>

<style>
</style>