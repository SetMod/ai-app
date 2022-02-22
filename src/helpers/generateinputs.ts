import randNum from "@/helpers/random";
import IInput from "@/interfaces/IInput";
import Input from "@/models/Input";

const generatedInputs = (len: number): Array<IInput> => Array.from(Array(len)).map(() => {
    const x = randNum(2);
    const w = randNum(3);
    return new Input(x, w);
});

export default generatedInputs