import { ColorEnum, NumBallsBet } from "../helpers/enums";


export class CotationNum {
    constructor(
        public num: NumBallsBet,
        public coast: number
    ){}
}

export class MultiEventsBetOnColor {
    constructor(
        public betName: string,
        public shortcut: string,
        public coasts: CotationColor[]
    ){}  
}

export class MultiEventsBetOnNums {
    constructor(
        public betName: string,
        public shortcut: string,
        public coasts: CotationNum[]
    ){}  
}

export class CotationColor {
    constructor(
        public color: ColorEnum,
        public coast: number
    ){}
}

export class BinaryBet {
    constructor(
        public shortcut: string,
        public label: string,
        public coast: number,
    ){}
}