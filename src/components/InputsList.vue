<template>
  <div class="inputs">
    <div
      v-for="(input, index) in signals.inputs"
      :key="index"
      class="inputs__cell"
      :class="{
        inputs__cell__green: !!input,
      }"
    >
      <div>
        <label>x:</label>
        <span>{{ signals.inputs[index] }}</span>
        <!-- <input type="number" min="0" max="1" v-model.number="signals.inputs[index]" :key="index" /> -->
      </div>

      <div>
        <label>w:</label>
        <span>{{ signals.weights[0][index] }}</span>
        <!-- <input type="number" v-model.number="signals.weights[0][index]" step="0.1" :key="index" /> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import IInputs from "@/interfaces/IInputs";
import ISignals from "@/interfaces/ISignals";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    inputs: {
      type: Object as PropType<IInputs>,
    },
    signals: {
      type: Object as PropType<ISignals>,
      required: true,
    },
  },
});
</script>

<style scoped>
.inputs {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 0.1rem;
}
@media (max-width: 768px) {
  .inputs {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (max-width: 468px) {
  .inputs {
    grid-template-columns: repeat(1, 1fr);
  }
}
.inputs__cell {
  padding: 0.3rem 0;
  background-color: #c93c3c;
}
.inputs__cell input[type="number"] {
  width: 5rem;
}
.inputs__cell__green {
  background-color: #4dc93c;
}
</style>