import IPresets from "@/interfaces/IPresets";
import { reactive } from "vue";
import randNum from "@/helpers/random";
import IInputs from "@/interfaces/IInputs";

const store = reactive({
    teta: randNum(15),
    iterations: {
        value: 0,
        setIterations(iteration: number) {
            this.value = iteration
        }
    },
    inputs: {
        value: new Array<IInputs>(),
        setInputs(value: Array<IInputs>) {
            this.value = value
        },
        setReverseInput(index: number) {
            if (this.value[index].x) {
                this.value[index].x = 0
            } else {
                this.value[index].x = 1
            }
        },
        increaseWeights() {
            this.value.forEach((input) => {
                // if x is 1 then increase weights by 1
                if (input.x) {
                    input.w += input.x;
                }
            });
        },
        decreaseWeights() {
            this.value.forEach((input) => {
                // if x is 1 then decrease weights by 1
                if (input.x) {
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
        value: new Array<IPresets>(),
        setPresets(value: Array<IPresets>) {
            this.value = value
        },
        getPreset(index: number): IPresets {
            return this.value[index]
        },
        addPreset(preset: IPresets) {
            this.value.push(preset);
        },
        deletePreset(index: number) {
            this.value.splice(index, 1);
        },
        resetPresets() {
            this.value = new Array<IPresets>()
        },
    },
});

export default store