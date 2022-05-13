<template>
    <section class="disease_form">
        <div>
            <label for="age">Age:</label>
            <input type="number" :value="age"
                @input="$emit('update:age', Number.parseFloat(($event.target as HTMLInputElement).value))" name="age"
                placeholder="age" min="0" max="200" step="1" />
        </div>
        <div>
            <label for="gender">Gender:</label>
            <select @input="$emit('update:gender', Number.parseFloat(($event.target as HTMLInputElement).value))"
                name="gender">
                <option v-for="(gender) in Object.keys(Gender).length / 2" :value="gender - 1" :key="gender">{{
                        Gender[gender - 1]
                }}</option>
            </select>
        </div>
        <div>
            <label for="activity ">Activity:</label>
            <select @input="$emit('update:activity', Number.parseFloat(($event.target as HTMLInputElement).value))"
                name="activity">
                <option v-for="(activity) in Object.keys(Activity).length / 2" :value="activity - 1" :key="activity">{{
                        Activity[activity - 1]
                }}</option>
            </select>
        </div>
        <div>
            <label for="insulin">Insulin:</label>
            <input type="number" :value="insulin" name="insulin"
                @input="$emit('update:insulin', Number.parseFloat(($event.target as HTMLInputElement).value))"
                placeholder="insulin" min="0" max="20" step="1" />
        </div>
        <div>
            <label for="bloodSugar">Blood sugar:</label>
            <input type="number" :value="bloodSugar" name="bloodSugar"
                @input="$emit('update:bloodSugar', Number.parseFloat(($event.target as HTMLInputElement).value))"
                placeholder="bloodSugar" min="0" max="300" step="1" />
        </div>
        <div>
            <label for="bloodPressure">Blood pressure:</label>
            <input type="number" :value="bloodPressure" name="bloodPressure"
                @input="$emit('update:bloodPressure', Number.parseFloat(($event.target as HTMLInputElement).value))"
                placeholder="bloodPressure" min="0" max="200" step="1" />
        </div>
        <div>
            <label for="cholesterol">Cholesterol:</label>
            <input type="number" :value="cholesterol" name="cholesterol"
                @input="$emit('update:cholesterol', Number.parseFloat(($event.target as HTMLInputElement).value))"
                placeholder="cholesterol" min="0" max="200" step="1" />
        </div>
        <div>
            <label for="restECG">Rest ECG:</label>
            <input type="number" :value="restECG" name="restECG"
                @input="$emit('update:restECG', Number.parseFloat(($event.target as HTMLInputElement).value))"
                placeholder="restECG" min="0" max="200" step="1" />
        </div>
        <div>
            <label for="cigaretsYears">Years of smoking cigarets:</label>
            <input type="number" :value="cigaretsYears" name="cigaretsYears"
                @input="$emit('update:cigaretsYears', Number.parseFloat(($event.target as HTMLInputElement).value))"
                placeholder="cigaretsYears" min="0" max="200" step="1" />
        </div>
        <div>
            <label for="alcoholYears">Years of drinking alcohol:</label>
            <input type="number" :value="alcoholYears" name="alcoholYears"
                @input="$emit('update:alcoholYears', Number.parseFloat(($event.target as HTMLInputElement).value))"
                placeholder="alcoholYears" min="0" max="200" step="1" />
        </div>
        <div>
            <label for="drugsYears">Years of taking drugs:</label>
            <input type="number" :value="drugsYears" name="drugsYears"
                @input="$emit('update:drugsYears', Number.parseFloat(($event.target as HTMLInputElement).value))"
                placeholder="drugsYears" min="0" max="200" step="1" />
        </div>
        <div>
            <label for="disease">Disease:</label>
            <select @input="$emit('update:disease', Number.parseFloat(($event.target as HTMLInputElement).value))"
                name="disease">
                <option v-for="disease in Object.keys(Diseases).length / 2" :value="disease - 1" :key="disease">{{
                        Diseases[disease - 1]
                }}
                </option>
            </select>

        </div>
    </section>
</template>
<script lang="ts">
import { Activity, Gender, Diseases } from "@/helpers/enums";
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
    props: {
        age: {
            type: Number,
            default: 0
        },
        gender: {
            type: Number,
            default: 0
        },
        activity: {
            type: Number,
            default: 0
        },
        insulin: {
            type: Number,
            default: 0
        },
        bloodSugar: {
            type: Number,
            default: 0
        },
        bloodPressure: {
            type: Number,
            default: 0
        },
        cholesterol: {
            type: Number,
            default: 0
        },
        restECG: {
            type: Number,
            default: 0
        },
        cigaretsYears: {
            type: Number,
            default: 0
        },
        alcoholYears: {
            type: Number,
            default: 0
        },
        drugsYears: {
            type: Number,
            default: 0
        },
        disease: {
            type: Number,
            default: 0
        },
    },
    setup() {
        return {
            Gender,
            Activity,
            Diseases
        }
    }
})
</script>>

<style scoped>
.disease_form {
    padding: 2rem;
    width: 80%;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 2fr 2fr;
    background: rgb(202, 202, 202);
    border-collapse: collapse;
    font-size: larger;
}

@media (max-width: 1000px) {
    .disease_form {
        grid-template-columns: 4fr;
    }
}

.disease_form label {
    font-size: larger;
    font-weight: bold;
}

.disease_form input[type=number] {
    width: 50%;
    padding: 12px 20px;
    margin: 8px 0;
    font-size: larger;
    box-sizing: border-box;
}

.disease_form input[type=number]:focus {
    border: 3px solid #555;
}


.disease_form select {
    width: 50%;
    padding: 12px 20px;
    margin: 8px 0;
    font-size: larger;
}

.disease_form>div {
    margin: 0 0 0 5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid black;
}
</style>