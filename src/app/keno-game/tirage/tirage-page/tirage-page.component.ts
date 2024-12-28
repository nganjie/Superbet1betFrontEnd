import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { animate, query, stagger, state, style, transition, trigger } from '@angular/animations';
import { BallColor } from '../../shared-components/balls-container/balls-container.component';
import { CountTimeService } from '../../services/count-time.service';
import { ApiserviceService } from 'src/app/service/apiservice/apiservice.service';

import { Tirage } from 'src/app/class/tirage/tirage';
import { Paramjeu } from 'src/app/class/paramjeu/paramjeu';
import { SessionStorageService } from 'src/app/services/session-storage/session-storage.service';
import { Router } from '@angular/router';
import { WebsocketService } from 'src/app/services/websocket/websocket.service';

@Component({
  selector: 'app-tirage-page',
  templateUrl: './tirage-page.component.html',
  styleUrls: ['./tirage-page.component.scss'],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [ // each time the binding value changes
        query(':enter', [
          style({
            opacity: 0,
            transform: 'scale(1.5, 1.5)'
          }),
          stagger(50, [
            animate(25, style({
              opacity: 1,
              transform: 'scale(1, 1)'
            }))
          ])
        ], { optional: true },)
      ])
    ]),
  ]
})
export class TiragePageComponent implements OnInit {

  accesDialog = true
  cle = ''

  numsList: number[] = [];
  balls: number[] = [];
  simulatorRadius = 22;
  param: Paramjeu = new Paramjeu()
  mult: any = '-'

  tirageID: any = ''
  jackpot: any = ''
  megajackpot: any

  ballRadius = 1.8;
  @ViewChildren('ballsGotten') ballsRefs!: QueryList<ElementRef<HTMLDivElement>>;
  @ViewChildren('allNums') numsRefs!: QueryList<ElementRef<HTMLDivElement>>;
  @ViewChild('ballGotten') ballGotten!: ElementRef<HTMLDivElement>;
  numsGotten: ElementRef<HTMLDivElement>[]=[] ; 

  count = 240
  constructor(private router: Router
    , private countTimeService: CountTimeService
    , private api: ApiserviceService
    , private tokenStorage: SessionStorageService
    , private websocket: WebsocketService) {
    setTimeout(() => {
      this.getRepAlgo() 
    }, 500);
    setTimeout(() => {
      this.afterViewInit() 
    }, 1000);
    setInterval(() => {
      this.acces()
    }, 5000)      
    setInterval(() => {
      this.count--
    }, 1000)
    setTimeout(() => {
      this.updSalleSync('F')
    }, 15000);
    setTimeout(() => {
      this.multiplicateur = this.mult
    }, 59000); //56000
    // this.mult = localStorage.getItem('multiplicateur')
    // this.jackpot = localStorage.getItem('jackpot')
    // this.megajackpot = localStorage.getItem('megajackpot')
    localStorage.removeItem('timeLeft');
    for (let i = 1; i < 81; i++) {
      this.numsList.push(i);
    }
    for (let i = 0; i < 20; i++) {
      this.balls.push(i);
    }
  }
  
  token: string = ''
  boules: number[] = []
  ngOnInit(): void {
    this.token = window.sessionStorage.getItem('auth-token')
    this.count = 240
    this.executeChronologically()
  }

  acces() {
    this.websocket.onexecute('jeuxAcces').then(data => {
      // console.log(test)
      // console.log(data)
      if (data !== 'error') {
        let acces = data[0].acces
        if (acces == 0) {
          // Vider le cache
          this.tokenStorage.clearCodesalle()
          this.tokenStorage.clearToken()
          //basculer sur la page login
          this.router.navigate(['/keno-game/login']);
        }
      } else {
        console.log('Unknown Error');
      }
    })
  }

  afterViewInit(): void {
    console.log('ICI:'+this.boules);
    //const ballsGot =this.boules;
    const ballsGot = this.generateBallsList()
    const ballsRefsArray = this.ballsRefs.toArray();
    const elementOnSimulator = this.ballGotten.nativeElement;
    let animDelay = 7500;
    const animDuration = 1500;
    const pas = 3;
    for (let i = 0; i <= 20; i++) {
      const num = ballsGot[i];
      if (i < 20) {
        const numRefElement = this.numsGotten?.[i].nativeElement;
        const ballDomElt = ballsRefsArray[i].nativeElement;
        const color = this.getColorByNum(num);

        setTimeout(() => {
          elementOnSimulator.style.width = (this.simulatorRadius - pas) * 2 + 'vh';
          elementOnSimulator.style.height = (this.simulatorRadius - pas) * 2 + 'vh';
          elementOnSimulator.style.fontSize = this.simulatorRadius - pas + 'vh';
          elementOnSimulator.style.backgroundColor = color;
          elementOnSimulator.textContent = num + '';
          setTimeout(() => {
            elementOnSimulator.style.width = '0';
            elementOnSimulator.style.height = '0';
            elementOnSimulator.style.fontSize = '0vh';
          }, animDuration);
        }, animDelay);

        ballDomElt.className = 'ball-result';
        numRefElement.className += ' square-num-shine';
        numRefElement.style.animationDelay = animDelay + 'ms';
        (numRefElement.firstElementChild as HTMLSpanElement).className += ' square-num-text-shine';
        (numRefElement.firstElementChild as HTMLSpanElement).style.animationDelay = animDelay + 'ms';

        ballDomElt.style.backgroundColor = color;
        ballDomElt.textContent = num + ''; //change
        ballDomElt.style.animationDelay = animDelay + 'ms';
      } else {
        const color = this.getColorByNum(num);
        setTimeout(() => {
          elementOnSimulator.style.width = (this.simulatorRadius - pas) * 2 + 'vh';
          elementOnSimulator.style.height = (this.simulatorRadius - pas) * 2 + 'vh';
          elementOnSimulator.style.fontSize = this.simulatorRadius - pas + 'vh';
          elementOnSimulator.style.backgroundColor = color;
          elementOnSimulator.textContent = num + 'X';
          setTimeout(() => {
            elementOnSimulator.style.width = '0';
            elementOnSimulator.style.height = '0';
            elementOnSimulator.style.fontSize = '0vh';
          }, animDuration);
        }, animDelay);
      }
      animDelay += 2500;
    }
    setTimeout(() => {
      this.countTimeService.initAction();
      setTimeout(() => {
        this.updSalleSync('V')
      }, 170000);
      setTimeout(() => {
        console.log('Execution: algorihme de distribution pour le prochain tirage...')
        this.getBoule()
      }, 175000);
      // setTimeout(() => {
      //   console.log('Execution: algorihme de distribution pour le prochain tirage...')
      //   this.updSalleSync('V')
      //   this.getBoule()
      // }, 165000);
    }, animDelay);
  }

  // setTimeout(() => {
  //   this.updSalleSync('V')
  // }, 160000);
  // setTimeout(() => {
  //   console.log('Execution: algorihme de distribution pour le prochain tirage...')
  //   this.getBoule()
  // }, 170000);

  executeChronologically() {
    //this.getRepAlgo()
    this.insertTirage()
    //await this.updSalleSync('F')
    // setTimeout(() => {
    //   this.afterView()
    // }, 500);
  }

  async getBoule() {
    try {
      this.websocket.onexecute('algoD').then(data => {
        if (data !== 'error') {
          localStorage.setItem("tirageID", data[0].tirageID);
        } else {
          console.log('ERROR:insertTirage')
        }
      })

      // this.api.algoD(this.tokenStorage.getCodesalle(), localStorage.getItem("tirageID")).subscribe((data) => {

      // }, error => {
      //   console.log(error.error);
      // }); 
    } catch (error) {
      console.log(error.error);
    }

  }

  multiplicateur: string = '-'
  numtirage: any
  getRepAlgo() { 
    this.websocket.onexecute('repAlgoList').then(data => {
      console.log('TEST');
      console.log(data);
      if (data !== 'error') {
        this.numtirage = data[0].numtirage
        this.boules = data[0].boules.split(",").map(Number);
        //this.afterView()
        const index = this.boules.indexOf(0);
        this.boules.splice(index, 1);
        this.mult = data[0].multiplicateur
        this.boules.push(this.mult)
        this.jackpot = data[0].jackpot
        this.megajackpot = data[0].megajackpot
      } else {
        console.log('ERROR:getRepAlgo')
      }
    })

    // this.api.listRepAlgo(this.tokenStorage.getCodesalle()).subscribe(rep=>{   
    //   this.numtirage=rep[0].numtirage
    //   this.boules=rep[0].boules.split(",").map(Number);
    //   const index = this.boules.indexOf(0);
    //   this.boules.splice(index, 1);
    //   this.mult=rep[0].multiplicateur
    //   this.boules.push(this.mult)
    //   this.jackpot =rep[0].jackpot
    //   this.megajackpot =rep[0].megajackpot 
    // })
  }

  updSalleSync(param: string) {
    this.websocket.onexecute('salleSynchUpdate' + '-' + param).then(data => {
      if (data !== 'error') {

      } else {
        console.log('ERROR:updSalleSync')
      }
    })
    //this.api.updSalleSync(this.tokenStorage.getCodesalle()+'-'+param).subscribe(data=>{})
  }

  tirage: Tirage
  insertTirage() {
    this.websocket.onexecute('tirage').then(data => {
      if (data !== 'error') {
        localStorage.setItem("tirageID", data[0].tirageID);
      } else {
        //A revoir
        console.log('ERROR:insertTirage')
      }
    })
    // this.tirage = new Tirage(this.tokenStorage.getCodesalle())
    // this.api.insertTirage(this.tirage).subscribe(data => {
    //   localStorage.setItem("tirageID", data[0].tirageID);
    // }, err => {
    //   localStorage.setItem("tirageID", err.error.text)
    // })
  }

  generateBallsList(): number[] {
    // if (this.boules.length == 1 || this.boules.length == 0) {
    //   return this.generateBallsListLocal()
    // } else {
    //this.getRepAlgo()
    return this.generateBallsListFromServeur()
    //}
  }

  getColorByNum(num: number): BallColor {
    if (num < 21) {
      return BallColor.GREEN;
    }
    else if (num > 20 && num < 41) {
      return BallColor.BLUE;
    }
    else if (num > 40 && num < 61) {
      return BallColor.RED;
    }
    else {
      return BallColor.YELLOW;
    }
  }

  generateBallsListLocal(): number[] {
    const listBalls = [];
    let ind = 79;
    let eltInd = 0;
    const numsArr = [...this.numsList];
    const refsCopy = [...this.numsRefs];
    let temp = numsArr[ind];
    let tempRef = refsCopy[ind];
    let i = 0;
    while (listBalls.length < 20) {
      listBalls.push(numsArr[eltInd]);
      numsArr[ind] = numsArr[eltInd];
      numsArr[eltInd] = temp;
      this.numsGotten?.push(refsCopy[eltInd]);
      refsCopy[ind] = refsCopy[eltInd];
      refsCopy[eltInd] = tempRef;
      eltInd++;
      ind -= 1;
      temp = numsArr[ind];
      tempRef = refsCopy[ind];
    }

    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  }

  generateBallsListFromServeur(): number[] {
    const listBalls = [];
    let ind = 79;
    const numsArr = [...this.numsList];
    const refsCopy = [...this.numsRefs];
    let temp = numsArr[ind];
    let tempRef = refsCopy[ind];
    let index = -1
    let eltInd = 0
    while (listBalls.length <= 20) {  // ici
      index = index + 1
      eltInd = this.boules[index] - 1
      listBalls.push(numsArr[eltInd]);
      numsArr[ind] = numsArr[eltInd];
      numsArr[eltInd] = temp;
      this.numsGotten?.push(refsCopy[eltInd]);
      refsCopy[ind] = refsCopy[eltInd];
      refsCopy[eltInd] = tempRef;
      ind -= 1;
      temp = numsArr[ind];
      tempRef = refsCopy[ind];
    }
    return this.boules;
  }


}
