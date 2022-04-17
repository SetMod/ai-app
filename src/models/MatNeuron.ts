import IPreset from "@/interfaces/IPreset"

export default class MatNeuron {
    inputs: number[]
    weights: number[]
    eta: number
    id: number
    errorThreshold: number = 0.005
    epsilon: number = 1
    delta: number = 1
    iterations: number = 0
    precision: number = 10000
    MAX_ITERATIONS: number = 100
    varian: string = "lb2"

    constructor(inputs: number[], weights: number[], id: number, eta: number = 1) {
        this.inputs = inputs
        this.weights = weights
        this.id = id
        this.eta = eta >= 0.05 || eta <= 1 ? eta : 1
    }

    learn(presets: Array<IPreset>, variant: string) {
        this.varian = variant;
        this.iterations = 0
        console.log(`\n\n\n[${new Date()}]`)
        console.log(`[INFO] Neuron [${this.id}] | Starting learning process...`)
        console.time()

        while (true) {
            let isPredictionsCorrect = true
            console.log("\n----------------------")

            presets.forEach((preset, index) => {
                console.log(`[INFO] Preset #${index + 1}, Iteration #${this.iterations}`)
                const isCorrect = this.learnOnPreset(preset)
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

    learnOnPreset(preset: IPreset) {
        let des
        let res
        switch (this.varian) {
            case "lb3":
                des = preset.value === this.id ? 1 : 0
                res = this.predictStep(preset.inputs)
                this.epsilon = des - res
                console.log(`[INFO] Desired result [${des}], got [${res}]`)
                return this.activateByEpsilon()
            case "lb4":
                des = preset.value === this.id ? 1 : 0
                res = this.predictSigma(preset.inputs)
                this.delta = this.round(res * (1 - res) * (des - res))
                console.log(`[INFO] Desired result [${des}], got [${res}]`)
                console.log(`\tSum [${this.getSum()}]`);
                console.log(`\tSigmoid [${res}]`);
                console.log(`\tDelta [${this.delta}]`);
                return this.activateByDelta()
            default:
                des = preset.value
                res = this.predictStep(preset.inputs)
                this.epsilon = des - res
                console.log(`[INFO] Desired result [${des}], got [${res}]`)
                return this.activateByStep(res, des)
        }
    }

    round(value: number) {
        return Math.round(value * this.precision) / this.precision
    }
    static round(value: number, precision: number = 10000): number {
        return Math.round(value * precision) / precision
    }

    predictStep(inputs?: number[]): number {
        const sum = this.getSum(inputs)
        return sum >= 0 ? 1 : 0
    }

    predictSigma(inputs?: number[]) {
        const sum = this.getSum(inputs)
        return this.round(1 / (1 + Math.pow(Math.E, -sum)))
    }

    getSum(inputs?: number[]) {
        if (inputs) this.inputs = inputs.length ? inputs : this.inputs
        let sum = 0
        for (let index = 0; index < this.inputs.length; index++)
            sum += this.inputs[index] * this.weights[index]
        return sum
    }

    activateByEpsilon() {
        if (this.epsilon !== 0) {
            console.log('\tCorrecting weights')
            this.correctWeights()
            return false
        }
        return true
    }

    activateByDelta() {
        console.log('\tCorrecting weights')
        this.correctWeights()
        return false
    }

    activateByStep(res: number, des: number) {
        if (des !== res) {
            console.log('\tCorrecting weights')
            this.correctWeights()
            return false
        }
        return true
    }

    correctWeights() {
        this.inputs.forEach((input, index) => {
            if (input > 0) this.weights[index] += this.getDeltaWeights(input)
        })
    }

    getDeltaWeights(input: number) {
        switch (this.varian) {
            case "lb4":
                return this.eta * this.delta * input
            default:
                return this.eta * this.epsilon * input
        }
    }
}