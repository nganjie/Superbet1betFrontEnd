export enum NumBallsBet {
    one = 1,
    two,
    three,
    four,
    five,
    six,
    seven,
    eight,
    nine,
    ten,
}



export class PariType {
    constructor(
        public name: string,
        public cotations: CotationItemNum[]
    ){
        this.cotations = cotations.sort((a, b) => a.numItem - b.numItem);
        const minNumPariCotation = this.cotations[0].numItem;
        const toAddList: CotationItemNum[] = [];
        for (let i = 1; i < minNumPariCotation; i ++){
            toAddList.push(new CotationItemNum(i, 0));
        }
        if (toAddList.length !== 0){
            this.cotations = toAddList.concat(this.cotations);
        }
    }
}

export class CotationItemNum {
    constructor(public numItem: NumBallsBet, public cote: number){}
}
