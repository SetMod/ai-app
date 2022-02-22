<template>
  <div>
    <div class="square">
      <div
        v-for="(input, index) in inputs.inputs"
        @click="inputs.setReverseInput(index)"
        :key="index"
        class="square__cell"
        :class="{ square__cell__over: !!input.x }"
      >
        {{ index }}
      </div>
    </div>
    <button @click="inputs.resetInputs()">Clear</button>
  </div>
</template>

<script lang="ts">
import IInputs from "@/interfaces/IInputs";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    inputs: {
      type: Object as PropType<IInputs>,
      required: true,
    },
  },
});
</script>

<style scoped>
.square {
  width: fit-content;
  margin: auto;
  border: 1px solid black;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
}
button {
  margin: 0.5rem 0;
}
.square__cell {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.5rem;
  cursor: crosshair;
  user-select: none;
  width: 2rem;
  height: 2rem;
  border: 1px solid black;
}
.square__cell__over {
  color: white;
  background-color: #000;
}
</style>