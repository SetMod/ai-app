import { Activity, Diseases, Gender } from "@/helpers/enums"
import Preset from "./Preset"

export interface IDiseaseInput {
    age: number,
    gender: Gender,
    activity: Activity,
    insulin: number,
    bloodSugar: number,
    bloodPressure: number,
    cholesterol: number,
    restECG: number,
    cigaretsYears: number,
    alcoholYears: number,
    drugsYears: number,
    disease: Diseases,
}
export default class DiseaseInput implements IDiseaseInput {
    age: number = 0
    gender: Gender = Gender.Male
    activity: Activity = Activity.Active
    insulin: number = 0
    bloodSugar: number = 0
    bloodPressure: number = 0
    cholesterol: number = 0
    restECG: number = 0
    cigaretsYears: number = 0
    alcoholYears: number = 0
    drugsYears: number = 0
    disease: Diseases = Diseases.Cancer
    reset() {
        this.age = 0
        this.gender = Gender.Male
        this.activity = Activity.Active
        this.insulin = 0
        this.bloodSugar = 0
        this.bloodPressure = 0
        this.cholesterol = 0
        this.restECG = 0
        this.cigaretsYears = 0
        this.alcoholYears = 0
        this.drugsYears = 0
        this.disease = Diseases.Cancer
    }
    set(inputs: number[]) {
        this.age = inputs[0]
        this.gender = inputs[1]
        this.activity = inputs[2]
        this.insulin = inputs[3]
        this.bloodSugar = inputs[4]
        this.bloodPressure = inputs[5]
        this.cholesterol = inputs[6]
        this.restECG = inputs[7]
        this.cigaretsYears = inputs[8]
        this.alcoholYears = inputs[9]
        this.drugsYears = inputs[10]
        this.disease = inputs[11]
    }
    getDiseaseInputs() {
        const inputValues = Object.values(this).map(v => parseFloat(v))
        inputValues.pop()
        return inputValues
    }
    static createPresets(diseaseInput: IDiseaseInput) {
        const inputValues = Object.values(diseaseInput)
        const Y = inputValues.pop()
        const X = inputValues
        const preset = new Preset(Y, X)
        return preset
    }
}
export const diseaseInputs = new Array<IDiseaseInput>(
    {
        age: 19, gender: Gender.Male, activity: Activity.Active, insulin: 0.2, bloodSugar: 120, cholesterol: 10, bloodPressure: 100, restECG: 11, cigaretsYears: 3, alcoholYears: 1, drugsYears: 3, disease: Diseases.Cancer
    },
    {
        age: 32, gender: Gender.Male, activity: Activity.Semiactive, insulin: 0.3, bloodSugar: 160, cholesterol: 40, bloodPressure: 80, restECG: 14, cigaretsYears: 0, alcoholYears: 12, drugsYears: 0, disease: Diseases.Diabetes
    },
    {
        age: 65, gender: Gender.Female, activity: Activity.Passive, insulin: 0.22, bloodSugar: 110, cholesterol: 90, bloodPressure: 140, restECG: 15, cigaretsYears: 0, alcoholYears: 0, drugsYears: 0, disease: Diseases.Hepatitis
    },
    {
        age: 18, gender: Gender.Male, activity: Activity.Passive, insulin: 0.44, bloodSugar: 90, cholesterol: 30, bloodPressure: 210, restECG: 13, cigaretsYears: 0, alcoholYears: 1, drugsYears: 0, disease: Diseases.Heart
    },
    {
        age: 13, gender: Gender.Female, activity: Activity.Active, insulin: 0.66, bloodSugar: 100, cholesterol: 20, bloodPressure: 90, restECG: 32, cigaretsYears: 0, alcoholYears: 0, drugsYears: 0, disease: Diseases.Heart
    },
    {
        age: 41, gender: Gender.Female, activity: Activity.Active, insulin: 0.32, bloodSugar: 30, cholesterol: 50, bloodPressure: 105, restECG: 11, cigaretsYears: 2, alcoholYears: 5, drugsYears: 4, disease: Diseases.Cancer
    },
    {
        age: 78, gender: Gender.Male, activity: Activity.Passive, insulin: 0.11, bloodSugar: 50, cholesterol: 44, bloodPressure: 120, restECG: 16, cigaretsYears: 33, alcoholYears: 42, drugsYears: 0, disease: Diseases.LungCancer
    },
    {
        age: 9, gender: Gender.Female, activity: Activity.Active, insulin: 0.65, bloodSugar: 180, cholesterol: 55, bloodPressure: 110, restECG: 10, cigaretsYears: 0, alcoholYears: 0, drugsYears: 0, disease: Diseases.Diabetes
    },
    {
        age: 5, gender: Gender.Male, activity: Activity.Active, insulin: 0.99, bloodSugar: 100, cholesterol: 34, bloodPressure: 90, restECG: 11, cigaretsYears: 0, alcoholYears: 0, drugsYears: 0, disease: Diseases.Heart
    },
)