<template>
  <div class="inputs">
    <div
      v-for="(input, index) in inputs.value"
      :key="index"
      class="inputs__cell"
      :class="{
        inputs__cell__green: !!input.x,
      }"
    >
      <div>
        <label>x:</label>
        <input
          type="number"
          min="0"
          max="1"
          v-model.number="input.x"
          :key="index"
        />
      </div>

      <div>
        <label>w:</label>
        <input type="number" v-model.number="input.w" step="0.1" :key="index" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import IStoreInputs from "@/interfaces/IStoreInputs";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    inputs: {
      type: Object as PropType<IStoreInputs>,
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