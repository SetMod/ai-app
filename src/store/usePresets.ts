import { reactive, toRefs } from "vue";
import Presets from "@/models/Presets";

export const state = reactive({
    presets: new Presets(),
});

export default function usePresets() {
    return {
        ...toRefs(state)
    }
}