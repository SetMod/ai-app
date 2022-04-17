import randNum from "@/helpers/random";
import IInput from "@/interfaces/IInput";
import IInputs from "@/interfaces/IInputs";
import Input from "@/models/Input";
import Inputs from "@/models/Inputs";
import { IDesiredResult } from "@/hooks/useInputs";

export function between(min: number, max: number): number {
    return Math.floor(
        Math.random() * (max + 1 - min) + min
    )
}

export const generateRandomArray = (arrayLength: number, arrayAmount: number, numberRange: { min: number, max: number }): number[][] => {
    const arrayOut = []
    for (let i = 0; i < arrayAmount; i++) {
        const arrayIn = []
        for (let j = 0; j < arrayLength; j++) {
            if (j === 0) {
                arrayIn[j] = 1;
            } else {
                arrayIn[j] = between(numberRange.min, numberRange.max);
            }
        }
        arrayOut[i] = arrayIn;
    }
    return arrayOut;
}

const generatedInputs = (inputsLength: number): Array<IInput> => {
    const inputs = new Array<IInput>();
    for (let index = 0; index <= inputsLength; index++) {
        const x = index === 0 ? 1 : randNum(2)
        const w = index === 0 ? between(3, 6) : randNum(3)
        inputs[index] = new Input(x, w)
    }
    return inputs
};

export const generateMultiInputs = (multiInputs: { inputs: number[], weights: number[][] }): Array<IInputs> => {
    const inputsArr = new Array<IInputs>()
    multiInputs.weights.forEach(weightArr => {
        const newInputs = new Inputs()
        weightArr.forEach((weight, j) => {
            let input = 0
            if (multiInputs.inputs) {
                input = multiInputs.inputs[j]
            } else {
                input = between(0, 2)
            }
            const newInput = new Input(input, weight)
            newInputs.inputs.push(newInput)
        })
        inputsArr.push(newInputs)
    })
    return inputsArr
}

export const generateDesiredResults = (): Array<IDesiredResult> => {
    const desiredResults = new Array<IDesiredResult>()
    const UkrainianAlphabet = ['А', 'Б', 'В', 'Г', 'Ґ', 'Д', 'Е', 'Є', 'Ж', 'З', 'И', 'І', 'Ї', 'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ь', 'Ю', 'Я',
    ]
    for (let index = 0; index < UkrainianAlphabet.length; index++) {
        desiredResults.push({ id: index, name: UkrainianAlphabet[index] })
    }
    return desiredResults;
}

export default generatedInputs