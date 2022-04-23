import { ref } from "vue";
import generatedInputs, { generateRandomArray, generateMultiInputs, generateDesiredResults } from "@/helpers/generateInputs";
import Inputs from "@/models/Inputs";
import IInputs from "@/interfaces/IInputs";


export interface IDesiredResult {
    id: number,
    name: string
}

export interface IInputsOptions {
    desiredResults: Array<IDesiredResult>
    inputsAmount: number
    weightsAmount: number
}

export default function useInputs(options?: IInputsOptions) {
    const inputs = ref(new Inputs(generatedInputs(35)))
    const desiredResults = ref(generateDesiredResults())
    const inputsArrayRaw = ref({
        inputs: generateRandomArray(35, 1, { min: 0, max: 2 })[0], // 33 of x's and w's items, 1 array of x's and 33 of arrays of w's
        weights: generateRandomArray(35, 33, { min: 0, max: 6 }) // 33 of x's and w's items, 1 array of x's and 33 of arrays of w's
    })
    const inputsArray = ref(new Array<IInputs>())
    if (options) {
        desiredResults.value = options.desiredResults
        const inputsAmount = options.inputsAmount
        const weightsAmount = options.weightsAmount
        const inputs = generateRandomArray(inputsAmount, 1, { min: 0, max: 2 })[0]
        const weights = generateRandomArray(inputsAmount, weightsAmount, { min: 0, max: 6 })
        inputsArrayRaw.value = { inputs, weights }
    }
    inputsArray.value = generateMultiInputs(inputsArrayRaw.value)
    return {
        inputs,
        desiredResults,
        inputsArrayRaw,
        inputsArray
    }
}