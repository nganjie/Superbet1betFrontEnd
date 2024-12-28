export class Tirage {
    constructor(
        public numero: number,
        public listeBoules: number[],
        public multiplicateur: number,
        public dateHeure: string
    ){

    }
}

export enum MultiplicateurVal {
    val1 = 0.5,
    val2 = 1,
    val3 = 1.5,
    val4 = 2
}

/* 

export class Tirage {
    constructor(
        public numero: number,
        public listeBoules: number[],
        public multiplicateur: MultiplicateurVal,
        public dateHeure: Date
    ){

    }
}

*/