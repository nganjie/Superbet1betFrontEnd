import { BinaryBet, CotationColor, CotationNum, MultiEventsBetOnColor, MultiEventsBetOnNums } from '../models/paris';
import { ColorEnum, NumBallsBet } from './enums';


export const multiEventsBetOnColors = [
    new MultiEventsBetOnColor(
    'Premier numéro couleur', 
    '*', [
        new CotationColor(ColorEnum.blue, 3.85),
        new CotationColor(ColorEnum.red, 3.85),
        new CotationColor(ColorEnum.green, 3.85),
        new CotationColor(ColorEnum.yellow, 3.85),
        ]
    ),
    new MultiEventsBetOnColor(
        'Dernier numéro couleur', 
        '/',
        [
        new CotationColor(ColorEnum.blue, 3.85),
        new CotationColor(ColorEnum.red, 3.85),
        new CotationColor(ColorEnum.green, 3.85),
        new CotationColor(ColorEnum.yellow, 3.85),
        ]
    )
];
export const multiEventsBetOnNums = [
    new MultiEventsBetOnNums(
        'Tout dedans',
        '+',
        [
            new CotationNum(NumBallsBet.one, 3.6),
            new CotationNum(NumBallsBet.two, 14),
            new CotationNum(NumBallsBet.three, 60),
            new CotationNum(NumBallsBet.four, 273),
            new CotationNum(NumBallsBet.five, 1400),
            new CotationNum(NumBallsBet.six, 6500),
        ]
    ),
    new MultiEventsBetOnNums(
        'Non sortant',
        '-',
        [
            new CotationNum(NumBallsBet.one, 1.2),
            new CotationNum(NumBallsBet.two, 1.6),
            new CotationNum(NumBallsBet.three, 2),
            new CotationNum(NumBallsBet.four, 2.7),
            new CotationNum(NumBallsBet.five, 3.7),
            new CotationNum(NumBallsBet.six, 5),
            new CotationNum(NumBallsBet.seven, 7),
            new CotationNum(NumBallsBet.eight, 9.5),
            new CotationNum(NumBallsBet.nine, 13),
            new CotationNum(NumBallsBet.ten, 18),
        ]
    )
];

export const binaryBets = [
    new BinaryBet('20+', 'Somme 20+', 1.9),
    new BinaryBet('20-', 'Somme 20-', 1.9,),
    new BinaryBet('5+', 'Somme 5+', 1.9),
    new BinaryBet('5-', 'Somme 5-', 1.9),
    new BinaryBet('1+', 'Premier 1+', 1.9),
    new BinaryBet('1-', 'Premier 1-', 1.9),
    new BinaryBet('1+', 'Dernier 1+', 1.9),
    new BinaryBet('1-', 'Dernier 1-', 1.9),
    new BinaryBet('200', 'Premier S1', 5.7),
    new BinaryBet('201', 'Dernier S1', 5.7),
    new BinaryBet('198', 'Premier impair', 1.9),
    new BinaryBet('199', 'Dernier impair', 1.9),
    new BinaryBet('188', 'Premier pair', 1.9),
    new BinaryBet('189', 'Dernier pair', 1.9),    
]