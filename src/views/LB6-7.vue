<template>
    <section class="container">
        <h2>Neuron</h2>

        <section>
            <div class="flex">
                <span>Result is :</span>
                <span class="result">{{ Diseases[results] }}</span>
            </div>
        </section>

        <section class="learn_section">
            <div>
                <label>Speed:</label>
                <input v-model.number="learnOptions.eta" type="number" name="eta" min="0.05" max="1" step="0.01" />
            </div>
            <button class="learn" @click="learn">Learn</button>
        </section>

        <DiseaseForm v-model:age="disease.age" v-model:gender="disease.gender" v-model:activity="disease.activity"
            v-model:bloodPressure="disease.bloodPressure" v-model:bloodSugar="disease.bloodSugar"
            v-model:insulin="disease.insulin" v-model:restECG="disease.restECG"
            v-model:cholesterol="disease.cholesterol" v-model:cigaretsYears="disease.cigaretsYears"
            v-model:alcoholYears="disease.alcoholYears" v-model:drugs-years="disease.drugsYears"
            v-model:disease="disease.disease" />

        <div>{{ disease }}</div>

        <section>
            <label>Add preset:</label>
            <button @click="addPreset">Add</button>
        </section>

        <section v-show="presets.presets.length">
            <select name="presets" v-model="selectedPreset" :required="true">
                <option :value="0" selected>Select preset</option>
                <option v-for="(preset, index) in presets.presets" :key="index" :value="index">#{{ index + 1 }} | {{
                        Diseases[preset.value]
                }}</option>
            </select>
        </section>
        <section class="buttons" v-show="presets.presets.length">
            <button class="presets__load" @click="loadPreset">Load</button>
            <button class="presets__delete" @click="deletePreset">Delete</button>
            <button @click="deleteAllPresets">Delete all</button>
        </section>
    </section>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import usePresets from "@/hooks/usePresets";
import useMatNeuronLayers from "@/hooks/useMatNeuronLayers";
import { ILearnOptions } from "@/models/MatNeuron";
import { Activity, Diseases, Gender } from "@/helpers/enums";
import DiseaseForm from "@/components/DiseaseForm.vue";
import DiseaseInput, { diseaseInputs } from "@/models/DiseaseInput";

export default defineComponent({
    components: {
        DiseaseForm
    },
    setup() {
        const disease = ref<DiseaseInput>(new DiseaseInput())
        const outputLayerAmount = Object.keys(Diseases).length / 2
        const inputLayerAmount = disease.value.getDiseaseInputs().length
        const selectedPreset = ref(0)
        const { presets } = usePresets({ testData: diseaseInputs })

        const { layers } = useMatNeuronLayers({
            variant: 'lb5',
            inputLayerAmount: inputLayerAmount,
            layersOptions: [
                { neuronAmount: 8 },
                { neuronAmount: 8 },
                { neuronAmount: outputLayerAmount },
            ]
        })

        const results = computed(() => {
            return layers.value.predict(disease.value.getDiseaseInputs())
        })

        const learnOptions = ref<ILearnOptions>({
            variant: 'lb5',
            eta: 1,
            maxIterations: 500,
            errorThreshold: 0.005
        })

        const learn = () => {
            layers.value.learn(presets.value.presets, learnOptions.value)
        }
        const addPreset = () => {
            presets.value.addPreset(DiseaseInput.createPresets(disease.value))
            disease.value.reset()
        }
        const loadPreset = () => {
            disease.value.set(presets.value.getPreset(selectedPreset.value).inputs)
        }
        const deletePreset = () => {
            presets.value.deletePreset(selectedPreset.value)
        }
        const deleteAllPresets = () => {
            presets.value.resetPresets()
        }
        return {
            Diseases,
            Gender,
            Activity,
            results,
            presets,
            learnOptions,
            layers,
            selectedPreset,
            disease,
            addPreset,
            loadPreset,
            deletePreset,
            deleteAllPresets,
            learn,
        };
    },
});
</script>

<style>
.learn_section {
    display: flex;
    justify-content: center;
    align-items: center;
}

.learn_section>div {
    margin: 0 1rem;
    margin: 2rem 0;
}

.learn_section input[type=number] {
    width: 50%;
    padding: 5px 20px;
    margin: 0 0 0 8px;
    font-size: larger;
    box-sizing: border-box;
}

.learn_section label {
    font-size: larger;
    font-weight: bold;
}
</style>