<template>
  <section>
    <div class="presets">
      Presets:
      <div class="presets__cell" v-for="(input, index) in presets.presets" :key="index">
        <p>#{{ index + 1 }} {{ input.result ? "even" : "odd" }}</p>
        <button
          class="presets__load"
          @click="inputs.setX(presets.getPreset(index).inputs)"
          :key="index"
        >Load</button>
        <button class="presets__delete" @click="presets.deletePreset(index)" :key="index">Delete</button>
      </div>
    </div>
    <button @click="presets.resetPresets()">Clear</button>
  </section>
</template>

<script lang="ts">
import IInputs from "@/interfaces/IInputs";
import IPresets from "@/interfaces/IPresets";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    presets: {
      type: Object as PropType<IPresets>,
      required: true,
    },
    inputs: {
      type: Object as PropType<IInputs>,
      required: true,
    },
  },
});
</script>

<style>
.presets {
  display: flex;
  justify-content: center;
  margin: 0.5rem auto;
}
.presets__cell {
  background-color: rgb(202, 202, 202);
  margin: 0 0.2rem 0;
}
.presets button {
  margin: 0 0.2rem 0;
  border-radius: 0.2rem;
}
.presets__load {
  background-color: rgb(149, 208, 235);
}
.presets__delete {
  background-color: rgb(240, 160, 160);
}
</style>