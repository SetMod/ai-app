import { reactive, ref, toRefs } from "vue";
import Presets from "@/models/Presets";
import Preset from "@/models/Preset";

export const state = reactive({
    globalPresets: new Presets(),
});
interface IPresetsOptions {
    testData: Object[]
    // testData: number[][]
    // desiredColIndex: number
}
export default function usePresets(options?: IPresetsOptions) {
    const presets = ref(new Presets())
    if (typeof options != 'undefined') {
        options.testData.forEach((inputs) => {
            presets.value.addPreset(createPresets(inputs))
        })
    }
    return {
        presets,
        ...toRefs(state)
    }
}

const createPresets = (input: Object) => {
    const inputValues = Object.values(input).map(value => typeof value == 'number' ? value : 0)
    const Y = inputValues.pop() || 0
    const X = inputValues
    const preset = new Preset(Y, X)
    return preset
}