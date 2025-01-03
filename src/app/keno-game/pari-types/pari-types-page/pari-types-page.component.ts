import { Component, OnInit } from '@angular/core';
import { TIMECOUNT } from '../../helpers/constants';
import { CountTimeService } from '../../services/count-time.service';
import { CotationItemNum, NumBallsBet, PariType } from '../models/pari_cotation';
import { ApiserviceService } from 'src/app/service/apiservice/apiservice.service';
import { SessionStorageService } from 'src/app/services/session-storage/session-storage.service';
import { WebsocketService } from 'src/app/services/websocket/websocket.service';



@Component({
  selector: 'app-pari-types-page',
  templateUrl: './pari-types-page.component.html',
  styleUrls: ['./pari-types-page.component.scss']
})
export class PariTypesPageComponent implements OnInit {

  pariKS: PariType[] = [];
  pariTD!: PariType;
  pariNS!: PariType;
  secondsRemaining;

  codesalle: string = ''

  jackpot: any = ''
  multiplicateur: any = ''
  megajackpot: any = ''

  constructor(private countTimeService: CountTimeService, private api: ApiserviceService, private websocket: WebsocketService, private tokenStorage: SessionStorageService) {
    this.secondsRemaining = localStorage.getItem('timeLeft') ?? TIMECOUNT;
    this.countTimeService.secondsRemainingSubject.subscribe((sec) => {
      this.secondsRemaining = sec;
    });
  }

  ngOnInit(): void {
    this.codesalle = this.tokenStorage.getCodesalle()
    this.fnPariTypes()
    this.pariNS = new PariType(
      'non sortant',
      [
        new CotationItemNum(1, 1.20),
        new CotationItemNum(2, 1.60),
        new CotationItemNum(3, 2.00),
        new CotationItemNum(4, 2.70),
        new CotationItemNum(5, 3.70),
        new CotationItemNum(6, 5.0),
        new CotationItemNum(7, 7.0),
        new CotationItemNum(8, 9.5),
        new CotationItemNum(9, 13),
        new CotationItemNum(10, 18)
      ]
    );
    this.pariTD = new PariType(
      'Tout dedans',
      [
        new CotationItemNum(1, 3.60),
        new CotationItemNum(2, 14),
        new CotationItemNum(3, 60),
        new CotationItemNum(4, 275),
        new CotationItemNum(5, 1400),
        new CotationItemNum(6, 6500)
      ]
    );
    this.pariKS.push(
      new PariType(
        '2 numéros',
        [
          new CotationItemNum(1, 1.00),
          new CotationItemNum(2, 8.0)
        ]),
      new PariType(
        '3 numéros',
        [
          new CotationItemNum(1, 1.00),
          new CotationItemNum(2, 2.00),
          new CotationItemNum(3, 10.0)
        ]
      ),
      new PariType(
        '4 numéros',
        [
          new CotationItemNum(2, 2.00),
          new CotationItemNum(3, 4.00),
          new CotationItemNum(4, 75)
        ]
      ),
      new PariType(
        '5 numéros',
        [
          new CotationItemNum(2, 1.00),
          new CotationItemNum(3, 2.00),
          new CotationItemNum(4, 8.0),
          new CotationItemNum(5, 500),
        ]
      ),
      new PariType(
        '6 numéros',
        [
          new CotationItemNum(2, 1),
          new CotationItemNum(3, 2),
          new CotationItemNum(4, 3),
          new CotationItemNum(5, 25),
          new CotationItemNum(6, 800),

        ]
      ),
      new PariType(
        '7 numéros',
        [
          new CotationItemNum(3, 1),
          new CotationItemNum(4, 3),
          new CotationItemNum(5, 30),
          new CotationItemNum(6, 220),
          new CotationItemNum(7, 3000),
        ]
      ),
      new PariType(
        '8 numéros',
        [
          new CotationItemNum(3, 1),
          new CotationItemNum(4, 2),
          new CotationItemNum(5, 6),
          new CotationItemNum(6, 50),
          new CotationItemNum(7, 1200),
          new CotationItemNum(8, 8000),
        ]
      ),
      new PariType(
        '9 numéros',
        [
          new CotationItemNum(3, 1),
          new CotationItemNum(4, 2),
          new CotationItemNum(5, 3),
          new CotationItemNum(6, 25),
          new CotationItemNum(7, 100),
          new CotationItemNum(8, 1500),
          new CotationItemNum(9, 9000),
        ]
      ),
      new PariType(
        '10 numéros',
        [
          new CotationItemNum(3, 1),
          new CotationItemNum(4, 2),
          new CotationItemNum(5, 3),
          new CotationItemNum(6, 5),
          new CotationItemNum(7, 10),
          new CotationItemNum(8, 200),
          new CotationItemNum(9, 2000),
          new CotationItemNum(NumBallsBet.ten, 10000),
        ]
      ),
    );
  }

  fnPariTypes() {
    try {
      this.websocket.onexecute('pari-types').then(data => {
        if (data !== 'error') {
          this.multiplicateur = data[0].multiplicateur
          this.jackpot = data[0].jackpot
          this.megajackpot = data[0].megajackpot
        } else {
          console.log('ERROR:getRepAlgo')
        }
      })

    } catch (error) {
      console.log(error.error);
    }
    // this.api.listRepAlgo(this.codesalle).subscribe(rep=>{
    //   this.multiplicateur=rep[0].multiplicateur
    //   this.jackpot =rep[0].jackpot
    //   this.megajackpot =rep[0].megajackpot 
    // })
  }


}


