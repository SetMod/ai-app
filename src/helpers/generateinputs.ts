import randNum from "@/helpers/random";
import IInputs from "@/interfaces/IInputs";

const generatedInputs = (len: number): Array<IInputs> => Array.from(Array(len)).map(() => {
    const x = randNum(2);
    const w = randNum(3);
    return { x, w };
});

export default generatedInputs