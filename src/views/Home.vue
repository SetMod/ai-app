<template>
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
        >
          {{ result ? "even" : "odd" }}
        </div>
      </div>
      <button @click="even">Even</button>
      <button @click="odd">Odd</button>
    </section>
    <section>
      <button class="learn" @click="learn">Learn</button>
      <div>Iterations: {{ iterations.value }}</div>
      <PresetsList :inputs="inputs" :presets="presets" />
    </section>

    <section class="teta">
      <label>Teta:</label>
      <input type="number" v-model.number="teta" />
    </section>

    <InputsDraw :inputs="inputs" />
    <InputsList :inputs="inputs" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import InputsList from "@/components/InputsList.vue";
import InputsDraw from "@/components/InputsDraw.vue";
import PresetsList from "@/components/PresetsList.vue";
import Neuron from "@/models/Neuron";
// import generatedInputs from "@/helpers/generateinputs";
import store from "@/store/store";

export default defineComponent({
  components: {
    InputsList,
    InputsDraw,
    PresetsList,
  },
  setup() {
    const result = computed(() => {
      const neuron = new Neuron(store.inputs, store.teta);
      return neuron.result();
    });

    // onMounted(() => {
    //   store.inputs.setInputs(generatedInputs(35));
    // });

    const learn = () => {
      const neuron = new Neuron(store.inputs, store.teta);
      neuron.learn(store.presets);
      store.iterations.setIterations(neuron.iterations);
    };
    const even = () => {
      store.presets.addPreset({
        result: 1,
        inputs: store.inputs.getInputs(),
      });
    };
    const odd = () => {
      store.presets.addPreset({
        result: 0,
        inputs: store.inputs.getInputs(),
      });
    };

    return {
      result,
      even,
      odd,
      learn,
      ...store,
    };
  },
});
</script>>


<style scoped>
.flex {
  display: flex;
  align-items: center;
  justify-content: center;
}
.result {
  padding: 0.5rem;
  display: flex;
  background-color: #c93c3c;
}
.result__green {
  background-color: #4dc93c;
}
.teta {
  margin: 1rem 0;
}
.learn {
  padding: 0.5rem 2rem;
  background-color: rgb(159, 202, 110);
  border-radius: 0.2rem;
  font-weight: bolder;
  color: darkslategrey;
  text-transform: uppercase;
}
button {
  margin: 0.5rem 0.5rem 0.5rem 0;
}
button:last-child {
  margin-right: 0;
}
</style>