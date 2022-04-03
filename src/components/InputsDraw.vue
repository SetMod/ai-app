<template>
  <div>
    <div class="square">
      <div
        v-for="(input, index) in signals.inputs"
        :key="index"
        v-show="index"
        @mouseenter="(e) => enter(e, index)"
        @mousedown="signals.setReverseInput(index)"
        class="square__cell"
        :class="{ square__cell__over: !!input }"
      ></div>
    </div>
    <button @click="signals.resetInputs()">Clear</button>
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
  setup(props) {
    const enter = (event: MouseEvent, index: number) => {
      if (event.buttons === 1) {
        if (props.signals.inputs[index] !== 1)
          props.signals.setReverseInput(index)
      } else if (event.buttons === 2) {
        if (props.signals.inputs[index] === 1)
          props.signals.setReverseInput(index)
      }
    }
    return {
      enter,
    }
  }
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