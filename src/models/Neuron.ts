import IInputs from "@/interfaces/IInputs"
import INeuron from "@/interfaces/INeuron"
import IPresets from "@/interfaces/IPresets"
import IInput from "../interfaces/IInput"

export default class Neuron implements INeuron {
    inputs: IInputs
    sum: number
    iterations: number
    epsilon: number
    eta: number
    MAX_ITERATIONS: number = 1000

    constructor(inputs: IInputs) {
        this.inputs = inputs
        this.sum = 0
        this.iterations = 0
        this.epsilon = 0
        this.eta = 0
    }

    result(): number {
        this.sum = 0
        this.inputs.inputs.forEach((input: IInput) => {
            this.sum += (input.x * input.w)
        })
        return this.sum >= 0 ? 1 : 0
    }

    correctWeights(result: number, expectedResult: number): boolean {
        if (result === 0) {
            // if expected result is 1 but got 0 then increase weights by 1
            if (expectedResult !== result) {
                console.log(`\tIncreasing weights`);
                this.inputs.increaseWeights()
                // if incorrect result iterate trough all presets one more time
                return false
            }
        } else if (result === 1) {
            // if expected result is 0 but got 1 then decrease weights by 1
            if (expectedResult !== result) {
                console.log(`\tDecreasing weights`);
                this.inputs.decreaseWeights()
                // if incorrect result iterate trough all presets one more time
                return false
            }
        }
        return true
    }

    learn(presets: IPresets) {
        this.iterations = 0;
        console.log(`\n\n[${new Date()}] [INFO] Starting learning process...`);
        console.time();
        // loop trough presets
        while (true) {
            let isCorrect = true
            console.log("\n----------------------");
            presets.presets.forEach((preset, index) => {
                // assign preset x's to inputs x's
                this.inputs.setX(presets.getPreset(index).inputs);
                // get the result y
                const result = this.result()
                console.log(`[INFO] Preset #${index + 1}, Iteration #${this.iterations} : Expected result [${preset.result}], got [${result}]`);
                this.correctWeights(result, preset.result) ? true : isCorrect = false
            })
            this.iterations += 1;
            // if all results are correct break the loop
            if (isCorrect) break
            if (this.iterations >= this.MAX_ITERATIONS) {
                console.log(`\n[INFO] To many iterations [${this.iterations}]`);
                break
            }
        }
        console.timeEnd();
        console.log(`\n\n[${new Date()}] [INFO] Done in #${this.iterations} iterations.\n\n`);
    }
}