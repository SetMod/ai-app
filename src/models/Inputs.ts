import IInput from "@/interfaces/IInput"
import IInputs from "@/interfaces/IInputs"

export default class Inputs implements IInputs {
    inputs: Array<IInput>

    constructor(inputs?: Array<IInput>) {
        this.inputs = inputs ? inputs : new Array<IInput>()
    }

    setInputs(inputs: Array<IInput>) {
        this.inputs = inputs
    }

    setReverseInput(index: number) {
        if (this.inputs[index].x) {
            this.inputs[index].x = 0
        } else {
            this.inputs[index].x = 1
        }
    }

    increaseWeights(epsilon?: number, eta: number = 1) {
        this.inputs.forEach((input) => {
            // if x is 1 then increase weights by 1
            if (input.x) {
                if (epsilon) {
                    input.w += eta * epsilon * input.x;
                } else {
                    input.w += input.x;
                }
            }
        });
    }

    decreaseWeights(epsilon?: number, eta: number = 1) {
        this.inputs.forEach((input) => {
            // if x is 1 then decrease weights by 1
            if (epsilon) {
                input.w -= eta * epsilon * input.x;
            } else {
                input.w -= input.x;
            }
        });
    }

    setX(x: number[]) {
        this.inputs.forEach((input, index) => {
            input.x = x[index]
        })
    }

    getInputs(): number[] {
        return this.inputs.map((input) => input.x)
    }

    resetInputs() {
        this.inputs.forEach((input, index) => {
            input.x = index === 0 ? 1 : 0;
        });
    }
}