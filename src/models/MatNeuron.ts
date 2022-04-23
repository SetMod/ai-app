import IPreset from "@/interfaces/IPreset"

export interface ILearnOptions {
    variant: string
    errorThreshold: number
    maxIterations: number
    eta: number
}


export default class MatNeuron {
    id: number = 0

    inputs: number[] = []
    weights: number[] = []
    variant: string

    eta: number = 1
    epsilon: number = 1
    delta: number = 1
    prediction: number = 1
    iterations: number = 0

    constructor(inputs: number[], weights: number[], variant: string, id: number) {
        this.inputs = inputs
        this.weights = weights
        this.variant = variant
        this.id = id
    }

    learnOnPresets(presets: Array<IPreset>, options: ILearnOptions = { variant: this.variant, errorThreshold: 0.005, maxIterations: 100, eta: 1 }) {
        const { errorThreshold, maxIterations, eta, variant } = options
        this.eta = eta ? eta >= 0.05 || eta <= 1 ? eta : 1 : 1
        this.variant = variant
        this.iterations = 0

        console.log(`[INFO] Neuron [${this.id}] | Starting learning process...`)
        console.time()

        while (this.iterations < maxIterations) {
            let isPredictionsCorrect = true
            console.log(`iteration[${this.iterations}]`);
            presets.forEach((preset) => {
                // console.log(`[INFO] Preset #${index + 1}, Iteration #${this.iterations}`)
                const isCorrect = this.learnOnPreset(preset, undefined, { eta: this.eta, variant: this.variant })
                if (!isCorrect && isPredictionsCorrect)
                    isPredictionsCorrect = false
            })

            this.iterations++
            if (isPredictionsCorrect) break
        }

        console.timeEnd()
        console.log(`\n\n[${new Date()}] [INFO] Done in #${this.iterations} iterations.\n\n`)
    }

    learnOnPreset(preset: IPreset, sum?: number, options: { eta: number, variant: string } = { eta: 1, variant: 'lb5' }) {
        this.eta = options.eta
        this.variant = options.variant

        const desired = this.getDesired(preset.value)
        if (this.variant !== "lb5") this.predict(preset.inputs)
        this.epsilon = desired - this.prediction
        if (typeof sum === 'undefined') sum = this.epsilon
        this.delta = this.round(this.prediction * (1 - this.prediction) * sum)
        // console.log(`[INFO] Desired result [${desired}], got [${this.prediction}]`)
        // console.log(`\tSum [${this.getSum()}]`);
        // console.log(`\tDelta [${this.delta}]`);
        // console.log(`\tSigmoid [${this.prediction}]`);
        return this.activate(desired)
    }

    predict(inputs?: number[]): number {
        switch (this.variant) {
            case "lb5":
            case "lb4":
                return this.predictSigma(inputs)
            default:
                return this.predictStep(inputs)
        }
    }

    predictStep(inputs?: number[]): number {
        const sum = this.getSum(inputs)
        this.prediction = sum >= 0 ? 1 : 0
        return this.prediction
    }

    predictSigma(inputs?: number[]): number {
        const sum = this.getSum(inputs)
        this.prediction = this.round(1 / (1 + Math.pow(Math.E, -sum)))
        return this.prediction
    }

    activate(desired: number = 0) {
        switch (this.variant) {
            case "lb5":
            case "lb4":
                return this.activateByDelta()
            case "lb3":
                return this.activateByEpsilon()
            default:
                return this.activateByStep(desired)
        }
    }

    activateByEpsilon(): boolean {
        if (this.epsilon !== 0) {
            this.correctWeights()
            return false
        }
        return true
    }

    activateByDelta(): boolean {
        this.correctWeights()
        return false
    }

    activateByStep(des: number): boolean {
        if (des !== this.prediction) {
            this.correctWeights()
            return false
        }
        return true
    }

    correctWeights() {
        // console.log('\tCorrecting weights')
        this.inputs.forEach((input, index) => {
            this.weights[index] += this.getDeltaWeights(input)
        })
    }

    getDeltaWeights(input: number) {
        switch (this.variant) {
            case "lb4":
                return this.eta * this.delta * input
            case "lb5":
                return this.eta * this.delta * input
            default:
                return this.eta * this.epsilon * input
        }
    }

    getDesired(desired: number) {
        switch (this.variant) {
            case "lb2":
                return desired
            default:
                return desired === this.id ? 1 : 0
        }
    }

    getSum(inputs?: number[]) {
        this.setInputs(inputs)
        let sum = 0
        for (let index = 0; index < this.inputs.length; index++)
            sum += this.inputs[index] * this.weights[index]
        return sum
    }

    setInputs(inputs?: number[]) {
        if (inputs)
            this.inputs = inputs.length ? inputs : this.inputs
    }

    round(value: number, precision: number = 10000) {
        return Math.round(value * precision) / precision
    }
}