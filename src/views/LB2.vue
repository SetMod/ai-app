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
        <PresetsList :inputs="inputs" :presets="presets" />
      </section>

      <section class="teta">
        <label>Teta:</label>
        <input type="number" v-model.number="teta" />
      </section>

      <InputsDraw :inputs="inputs" />
      <InputsList :inputs="inputs" />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import InputsList from "@/components/InputsList.vue";
import InputsDraw from "@/components/InputsDraw.vue";
import PresetsList from "@/components/PresetsList.vue";
import useInputs from "@/store/useInputs";
import usePresets from "@/store/usePresets";
import useNeuron from "@/store/useNeuron";
import Preset from "@/models/Preset";

export default defineComponent({
  components: {
    InputsList,
    InputsDraw,
    PresetsList,
  },
  setup() {
    const { inputs, teta, } = useInputs();
    const { presets } = usePresets();
    const { neuron, result, iterations, } = useNeuron(inputs.value, teta.value);

    const learn = () => {
      neuron.value.learn(presets.value);
    };

    const even = () => {
      presets.value.addPreset(new Preset(1, inputs.value.getInputs()));
    };

    const odd = () => {
      presets.value.addPreset(new Preset(0, inputs.value.getInputs()));
    };

    return {
      result,
      inputs,
      teta,
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