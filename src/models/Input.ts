import IInput from "@/interfaces/IInput";

export default class Input implements IInput {
    w: number;
    x: number;

    constructor(x: number, w: number) {
        this.x = x
        this.w = w
    }
}