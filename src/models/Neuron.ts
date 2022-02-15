import IStoreInputs from "@/interfaces/IStoreInputs"
import IStorePresets from "@/interfaces/IStorePresets"
import IInputs from "../interfaces/IInputs"

export default class Neuron {
    inputs: IStoreInputs
    Sum: number
    teta: number
    iterations: number

    constructor(inputs: IStoreInputs, teta: number) {
        this.inputs = inputs
        this.teta = teta
        this.Sum = 0
        this.iterations = 0
    }

    public result(): number {
        this.Sum = 0
        this.inputs.value.forEach((input: IInputs) => {
            this.Sum += (input.x * input.w)
        })

        return this.Sum >= this.teta ? 1 : 0
    }

    public learn(presets: IStorePresets) {
        this.iterations = 0;
        const MAX_ITERATIONS = 10000
        console.log(`\n\n[${new Date()}] [INFO] Starting learning process...`);
        console.time();
        // loop trough presets
        let allTrue = false
        while (!allTrue) {
            let isCorrect = true
            console.log("\n----------------------");
            presets.value.forEach((preset, index) => {
                // assign preset x's to inputs x's
                this.inputs.setX(presets.getPreset(index).inputs);
                // get the result y
                const res = this.result()
                console.log(`[INFO] Preset #${index + 1}, Iteration #${this.iterations} : Expected result [${preset.result}], got [${res}]`);
                if (res === 0) {
                    // if expected result is 1 but got 0 then increase weights by 1
                    if (preset.result !== res) {
                        console.log(`\tIncreasing weights`);
                        this.inputs.increaseWeights()
                        // if incorrect result iterate trough all presets one more time
                        isCorrect = false
                    }
                } else if (res === 1) {
                    // if expected result is 0 but got 1 then decrease weights by 1
                    if (preset.result !== res) {
                        console.log(`\tDecreasing weights`);
                        this.inputs.decreaseWeights()
                        // if incorrect result iterate trough all presets one more time
                        isCorrect = false
                    }
                }
            })
            this.iterations += 1;
            // if all results correct exit from the loop
            if (isCorrect) allTrue = true
            if (this.iterations >= MAX_ITERATIONS) {
                console.log(`\n[INFO] To many iterations [${this.iterations}]`);

                break
            }
        }
        console.log(`\n\n[${new Date()}] [INFO] Done in #${this.iterations} iterations.\n\n`);
        console.timeEnd();
    }
}