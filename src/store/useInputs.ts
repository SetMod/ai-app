import { reactive, toRefs } from "vue";
import randNum from "@/helpers/random";
import generatedInputs from "@/helpers/generateinputs";
import Inputs from "@/models/Inputs";

export const store = reactive({
    inputs: new Inputs(),
    teta: randNum(15),
    desiredResult: randNum(5),
});

export default function useInputs() {
    store.inputs.setInputs(generatedInputs(35));
    return {
        ...toRefs(store)
    }
}