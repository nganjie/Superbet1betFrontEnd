import { MultiplicateurVal } from './tirage';

export class MultiAndTime {
    constructor(
        public multiValue: MultiplicateurVal,
        public date: Date
    ){
    }
}

export class NumAndOccurences {
    constructor(
        public num: number,
        public nbTimes: number
    ){

    }
}

