import IPreset from "@/interfaces/IPreset";
import { reactive, toRefs } from "vue";
import randNum from "@/helpers/random";
import IInput from "@/interfaces/IInput";
import generatedInputs from "@/helpers/generateInputs";

export const store = reactive({
    teta: randNum(15),
    iterations: {
        value: 0,
        setIterations(iteration: number) {
            this.value = iteration
        }
    },
    inputs: {
        value: new Array<IInput>(),
        setInputs(value: Array<IInput>) {
            this.value = value
        },
        setReverseInput(index: number) {
            if (this.value[index].x) {
                this.value[index].x = 0
            } else {
                this.value[index].x = 1
            }
        },
        increaseWeights(epsilon?: number, eta: number = 1) {
            this.value.forEach((input) => {
                // if x is 1 then increase weights by 1
                if (input.x) {
                    if (epsilon) {
                        input.w += eta * epsilon * input.x;
                    } else {
                        input.w += input.x;
                    }
                }
            });
        },
        decreaseWeights(epsilon?: number, eta: number = 1) {
            this.value.forEach((input) => {
                // if x is 1 then decrease weights by 1
                if (epsilon) {
                    input.w -= eta * epsilon * input.x;
                } else {
                    input.w -= input.x;
                }
            });
        },
        setX(x: number[]) {
            this.value.forEach((input, index) => {
                input.x = x[index]
            })
        },
        getInputs(): number[] {
            return this.value.map((input) => input.x)
        },
        resetInputs() {
            this.value.forEach((input) => {
                input.x = 0;
            });
        }
    },
    presets: {
        value: new Array<IPreset>(),
        setPresets(value: Array<IPreset>) {
            this.value = value
        },
        getPreset(index: number): IPreset {
            return this.value[index]
        },
        addPreset(preset: IPreset) {
            this.value.push(preset);
        },
        deletePreset(index: number) {
            this.value.splice(index, 1);
        },
        resetPresets() {
            this.value = new Array<IPreset>()
        },
    },
});

export default function useStore() {
    store.inputs.setInputs(generatedInputs(35));
    return {
        ...toRefs(store)
    }
}