import IPreset from "@/interfaces/IPreset"

export default class MatNeuron {
    inputs: number[]
    weights: number[]
    eta: number
    id: number
    epsilon: number = 1
    delta: number = 1
    iterations: number = 0
    MAX_ITERATIONS: number = 1000

    constructor(inputs: number[], weights: number[], id: number, eta: number = 1) {
        this.inputs = inputs
        this.weights = weights
        this.id = id
        this.eta = eta >= 0.05 || eta <= 1 ? eta : 1
    }
    predict(inputs?: number[]): number {
        const sum = this.getSum(inputs)
        return sum >= 0 ? 1 : 0
    }
    predictSigma(inputs?: number[]) {
        const sum = this.getSum(inputs)
        return 1 / (1 + Math.E ^ (-sum))
    }
    getSum(inputs?: number[]) {
        if (inputs)
            this.setNeuronInputs(inputs)
        let sum = 0
        for (let index = 0; index < this.inputs.length; index++) {
            const input = this.inputs[index]
            const weight = this.weights[index]
            sum += (input * weight)
        }
        return sum
    }
    learn(presets: Array<IPreset>, lb: string) {
        this.iterations = 0
        console.log(`\n\n\n[${new Date()}]`)
        console.log(`[INFO] Neuron [${this.id}] | Starting learning process...`)
        console.time()

        while (true) {
            let isPredictionsCorrect = true
            console.log("\n----------------------")

            presets.forEach((preset, index) => {
                console.log(`[INFO] Preset #${index + 1}, Iteration #${this.iterations}`)
                const isCorrect = this.learnOnPreset(preset, lb)
                if (!isCorrect && isPredictionsCorrect)
                    isPredictionsCorrect = false
            })

            this.iterations += 1
            if (isPredictionsCorrect) break
            if (this.iterations >= this.MAX_ITERATIONS) {
                console.log(`\n[INFO] To many iterations [${this.iterations}]`)
                break
            }
        }

        console.timeEnd()
        console.log(`\n\n[${new Date()}] [INFO] Done in #${this.iterations} iterations.\n\n`)
    }
    learnOnPreset(preset: IPreset, lb: string) {
        const desired = this.getDesiredFromPreset(lb, preset.value)
        const result = this.predict(preset.inputs)
        console.log(`[INFO] Desired result [${desired}], got [${result}]`)

        this.epsilon = desired - result
        this.delta = result * (1 - result) * (desired - result)
        return this.checkEpsilon()
    }
    setNeuronInputs(inputs: number[]) {
        this.inputs = inputs
    }
    getDesiredFromPreset(lb: string, presetVal: number) {
        switch (lb) {
            case "lb2":
                return presetVal // Lb2 - <0,1>
            case "lb3":
                return presetVal === this.id ? 1 : 0 // Lb3 - <0,1,..,32>
            default:
                return presetVal
        }
    }
    checkEpsilon() {
        if (this.epsilon > 0) {
            console.log(`\tIncreasing weights`)
            this.correctWeights()
            return false
        }
        else if (this.epsilon < 0) {
            console.log(`\tDecreasing weights`)
            this.correctWeights()
            return false
        }
        return true
    }
    correctWeights() {
        this.inputs.forEach((input, index) => {
            if (input > 0) {
                let weight = this.weights[index]
                weight += this.eta * this.epsilon * input
                this.weights[index] = weight
            }
        })
    }
}