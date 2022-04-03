<template>
  <section>
    <h2>Presets:</h2>
    <!--------------------------------------lb3-------------------------------------->
    <section v-if="desiredResults">
      <section>
        <button @click="addPreset(selectedDesire)">Add</button>
        <select name="desiredResults" v-model="selectedDesire" :required="true">
          <option :value="0" selected>Select letter</option>
          <option
            v-for="desired in desiredResults"
            :value="desired.id"
            :key="desired.id"
          >{{ desired.name }}</option>
        </select>
        <button @click="loadSavedPresets">Load saved presets</button>
      </section>

      <section v-show="presets.presets.length">
        <select name="presets" v-model="selectedPreset" :required="true">
          <option :value="0" selected>Select preset</option>
          <option
            v-for="(preset, index) in presets.presets"
            :key="index"
            :value="index"
          >#{{ index + 1 }} | {{ desiredResults[preset.value].name }}</option>
        </select>
      </section>
    </section>
    <!--------------------------------------lb2-------------------------------------->
    <section v-else>
      <section>
        <button @click="addPreset(1)">Even</button>
        <button @click="addPreset(0)">Odd</button>
      </section>

      <section v-show="presets.presets.length">
        <select name="presets" v-model="selectedPreset" :required="true">
          <option :value="0" selected>Select preset</option>
          <option
            v-for="(preset, index) in presets.presets"
            :key="index"
            :value="index"
          >#{{ index + 1 }} {{ preset.value ? "even" : "odd" }}</option>
        </select>
      </section>
    </section>
    <!----------------------------------------------------------------------------------->
    <section class="buttons" v-show="presets.presets.length">
      <button
        class="presets__load"
        @click="signals.setInputs(presets.getPreset(selectedPreset).inputs)"
      >Load</button>
      <button class="presets__delete" @click="presets.deletePreset(selectedPreset)">Delete</button>
      <button @click="presets.resetPresets()">Clear</button>
    </section>

    <!-- <div class="presets">
      <div class="presets__cell" v-for="(preset, index) in presets.presets" :key="index">
        <div v-if="desiredResults">
          <p>#{{ index + 1 }} | {{ desiredResults[preset.value].name }}</p>
        </div>
        <div v-else>
          <p>#{{ index + 1 }} {{ preset.value ? "even" : "odd" }}</p>
        </div>

        <button
          class="presets__load"
          @click="signals.setInputs(presets.getPreset(index).inputs)"
          :key="index"
        >Load</button>

        <button class="presets__delete" @click="presets.deletePreset(index)" :key="index">Delete</button>
      </div>
    </div>-->
  </section>
</template>

<script lang="ts">
import IPresets from "@/interfaces/IPresets";
import { IDesiredResult } from "@/hooks/useInputs";
import { defineComponent, PropType, ref } from "vue";
import ISignals from "@/interfaces/ISignals";
import IInputs from "@/interfaces/IInputs";
import Preset from "@/models/Preset";
import { generatePresets } from "@/helpers/generatePresets";

export default defineComponent({
  props: {
    presets: {
      type: Object as PropType<IPresets>,
      required: true,
    },
    signals: {
      type: Object as PropType<ISignals>,
      required: true,
    },
    inputs: {
      type: Object as PropType<IInputs>,
    },
    desiredResults: {
      type: Object as PropType<Array<IDesiredResult>>
    }
  },
  setup(props) {
    const selectedDesire = ref(0)
    const selectedPreset = ref(0)
    const addPreset = (result: number) => {
      const inputs = props.signals.getInputs()
      props.presets.addPreset(new Preset(result, inputs))
    };
    const loadSavedPresets = () => {
      props.presets.setPresets(generatePresets())
    }
    return {
      loadSavedPresets,
      selectedDesire,
      selectedPreset,
      addPreset
    }
  }
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