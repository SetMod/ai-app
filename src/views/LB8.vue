<template>
  <section>
    <div class="container">
      <h2>Neuron</h2>

      <section class="options_form">
        <div class="option_form_inputs">
          <div class="option_form_input">
            <label>Inputs amount:</label>
            <input type="number" v-model.number="inputLayerAmount" />
          </div>
          <div class="option_form_input">
            <label>Outputs amount:</label>
            <input type="number" v-model.number="outputLayerAmount" />
          </div>
          <div class="option_form_input">
            <label>Speed:</label>
            <input
              type="number"
              v-model.number="learnOptions.eta"
              min="0.05"
              max="1"
              step="0.01"
            />
          </div>
          <div class="option_form_input">
            <label>Error threshold:</label>
            <input
              type="number"
              v-model.number="learnOptions.errorThreshold"
              min="0"
              max="1"
              step="0.001"
            />
          </div>
          <div class="option_form_input">
            <label>Max iterations:</label>
            <input type="number" v-model.number="learnOptions.maxIterations" />
          </div>
        </div>
        <div>
          <label>Layers:</label>
          <button @click="addLayer">Add</button>
          <button @click="deleteLayer">Delete</button>
          <button @click="createLayers">Create</button>
          <label>Layers amount: {{ layersOptions.length }}</label>
          <br />
          <div
            v-for="(layer, index) in layersOptions"
            :key="index"
            class="option_form_input"
          >
            <label>Layer #{{ index }} | Neuron amount</label>
            <input type="number" v-model="layer.neuronAmount" />
          </div>
        </div>
      </section>

      <section>
        <button class="learn" @click="learn" :disabled="isLearning">
          Learn
        </button>
        <h3 v-show="isLearning">Learning...</h3>
      </section>

      <section v-if="desiredResults">
        <section>
          <select
            name="desiredResults"
            v-model="selectedDesire"
            :required="true"
          >
            <option :value="0" selected>Select letter</option>
            <option
              v-for="desired in desiredResults"
              :value="desired.id"
              :key="desired.id"
            >
              {{ desired.name }}
            </option>
          </select>
          <button @click="addPreset(selectedDesire)">Add</button>
          <button @click="loadSavedPresets">Load saved presets</button>
        </section>

        <section v-show="presets.presets.length">
          <select name="presets" v-model="selectedPreset" :required="true">
            <option :value="0" selected>Select preset</option>
            <option
              v-for="(preset, index) in presets.presets"
              :key="index"
              :value="index"
            >
              #{{ index + 1 }} | {{ desiredResults[preset.value].name }}
            </option>
          </select>
        </section>

        <section class="buttons" v-show="presets.presets.length">
          <button @click="loadPreset">Load</button>
          <button @click="deletePreset">Delete</button>
          <button @click="presets.resetPresets()">Clear</button>
        </section>
      </section>

      <section class="flex">
        <section>
          <div class="flex">
            Result is :
            <span class="result">{{ desiredResults[results].name }}</span>
          </div>
        </section>
      </section>

      <section>
        <div class="draw">
          <div
            v-for="(input, index) in inputs"
            :key="index"
            v-show="index"
            @mouseenter="(e) => reverseInputOnMouseEnter(e, index)"
            @mousedown="reverseInput(index)"
            class="draw_cell"
            :class="{ draw_cell_over: !!input }"
          ></div>
        </div>
        <button @click="clearInputs">Clear</button>
      </section>
    </div>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from "vue";
import {
  generateDesiredResults,
  generateRandomArray,
} from "@/helpers/generateInputs";
import usePresets from "@/hooks/usePresets";
import useMatNeuronLayers from "@/hooks/useMatNeuronLayers";
import { ILearnOptions } from "@/models/MatNeuron";
import { ILayerOptions } from "@/models/MatNeuronLayer";
import Preset from "@/models/Preset";
import { generatePresets } from "@/helpers/generatePresets";

export default defineComponent({
  setup() {
    const desiredResults = generateDesiredResults();
    const inputLayerAmount = ref(36);
    const outputLayerAmount = ref(desiredResults.length);
    const selectedDesire = ref(0);
    const selectedPreset = ref(0);
    const isLearning = ref(false);
    const inputs = reactive<number[]>(
      generateRandomArray({
        arrayLength: inputLayerAmount.value,
        arrayAmount: 1,
        numberRange: { min: 0, max: 1, precision: 1 },
      })[0]
    );
    const { presets } = usePresets();
    const layersOptions = reactive<ILayerOptions[]>([{ neuronAmount: 10 }]);
    const learnOptions = ref<ILearnOptions>({
      variant: "lb5",
      eta: 1,
      maxIterations: 400,
      errorThreshold: 0.005,
    });
    // const inputs = computed<number[]>(() => {
    //   return generateRandomArray({
    //     arrayLength: inputLayerAmount.value,
    //     arrayAmount: 1,
    //     numberRange: { min: 0, max: 1, precision: 1 },
    //   })[0];
    // });

    const { layers } = useMatNeuronLayers({
      variant: "lb5",
      inputLayerAmount: inputLayerAmount.value,
      outputLayerAmount: outputLayerAmount.value,
      layersOptions: layersOptions,
    });
    const addLayer = () => {
      layersOptions.push({ neuronAmount: 3 });
    };
    const deleteLayer = () => {
      layersOptions.pop();
      layers.value.layers.pop();
    };
    const createLayers = () => {
      layers.value.initLayers(
        inputLayerAmount.value,
        outputLayerAmount.value,
        layersOptions,
        learnOptions.value.variant
      );
    };
    const results = computed(() => {
      return layers.value.predict(inputs);
    });
    const learn = async () => {
      isLearning.value = true;
      console.log(isLearning.value);
      await new Promise((resolve) => {
        layers.value.learn(presets.value.presets, learnOptions.value);
        resolve(false);
      }).then((val) => {
        isLearning.value = typeof val == "boolean" ? val : false;
      });
      // isLearning.value = false;
      console.log(isLearning.value);
    };
    const reverseInput = (index: number) => {
      if (index < inputs.length && index != 0)
        inputs[index] = inputs[index] ? 0 : 1;
    };
    const clearInputs = () => {
      inputs.forEach((_, idx) => (inputs[idx] = 0));
    };
    const reverseInputOnMouseEnter = (event: MouseEvent, index: number) => {
      if (event.buttons === 1) reverseInput(index);
    };
    const loadPreset = () => {
      const presetInputs = presets.value.getPreset(selectedPreset.value).inputs;
      inputs.forEach((_, idx) => (inputs[idx] = presetInputs[idx]));
    };
    const deletePreset = () => {
      presets.value.deletePreset(selectedPreset.value);
    };
    const addPreset = (result: number) => {
      presets.value.addPreset(
        new Preset(
          result,
          inputs.map((v) => v) // copy array without reactivity
        )
      );
    };
    const loadSavedPresets = () => {
      presets.value.setPresets(generatePresets());
    };
    return {
      results,
      inputs,
      presets,
      layers,
      isLearning,
      learnOptions,
      desiredResults,
      inputLayerAmount,
      outputLayerAmount,
      layersOptions,
      selectedDesire,
      selectedPreset,
      addPreset,
      loadSavedPresets,
      addLayer,
      deleteLayer,
      createLayers,
      reverseInput,
      loadPreset,
      deletePreset,
      clearInputs,
      reverseInputOnMouseEnter,
      learn,
    };
  },
});
</script>

<style>
.options_form {
  display: flex;
  margin: auto;
  width: fit-content;
}

@media (max-width: 1000px) {
  .options_form {
    display: block;
  }
}

.options_form label {
  font-size: larger;
  font-weight: bold;
}

.options_form input[type="number"] {
  width: 50%;
  /* padding: 12px 20px; */
  margin: 5px 0;
  font-size: larger;
  box-sizing: border-box;
}

.options_form input[type="number"]:focus {
  border: 3px solid #555;
}

@media (min-width: 1000px) {
  .option_form_inputs:first-child {
    margin-right: 5rem;
  }
}

.option_form_input {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .option_form_input {
    display: block;
  }
  .option_form_input > * {
    display: block;
    margin: 5px auto !important;
  }
}

.draw {
  width: fit-content;
  margin: auto;
  border: 1px solid black;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
}
.draw_cell {
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
.draw_cell_over {
  color: white;
  background-color: #000;
}
</style>