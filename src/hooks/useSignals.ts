import { generateRandomArray } from "@/helpers/generateInputs"
import Signals from "@/models/Signals"
import { ref } from "vue"

export interface ISignalsOptions {
    arrayLength: number
    inputs: {
        arrayAmount: number
        numberRange: { min: number, max: number, precision: number }

    }
    weights: {
        arrayAmount: number
        numberRange: { min: number, max: number, precision: number }

    }
}

export default function useSignals(signalsOptions: ISignalsOptions) {
    const arrayLength = signalsOptions.arrayLength
    const { arrayAmount: inputsAmount, numberRange: inputsRange } = signalsOptions.inputs
    const { arrayAmount: weightsAmount, numberRange: weightsRange } = signalsOptions.weights
    const inputs = generateRandomArray({ arrayLength, arrayAmount: inputsAmount, numberRange: inputsRange })[0]
    const weights = generateRandomArray({ arrayLength, arrayAmount: weightsAmount, numberRange: weightsRange })
    const signals = ref(new Signals(inputs, weights))
    return {
        signals
    }
}