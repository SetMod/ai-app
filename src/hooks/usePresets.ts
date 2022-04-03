import { reactive, ref, toRefs } from "vue";
import Presets from "@/models/Presets";

export const state = reactive({
    globalPresets: new Presets(),
});

export default function usePresets() {
    const presets = ref(new Presets())
    return {
        presets,
        ...toRefs(state)
    }
}