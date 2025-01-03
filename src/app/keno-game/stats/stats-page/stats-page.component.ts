import { Component, OnInit } from '@angular/core';
import { TIMECOUNT } from '../../helpers/constants';
import { CountTimeService } from '../../services/count-time.service';
import { NumAndOccurences, MultiAndTime } from '../models/histories_elts';
import { MultiplicateurVal, Tirage } from '../models/tirage';
import { ApiserviceService } from 'src/app/service/apiservice/apiservice.service';
import { Multiplicateur } from 'src/app/class/multiplicateur/multiplicateur';
import { Boule } from 'src/app/class/boule/boule';
import { SessionStorageService } from 'src/app/services/session-storage/session-storage.service';
import { WebsocketService } from 'src/app/services/websocket/websocket.service';

@Component({
  selector: 'app-stats-page',
  templateUrl: './stats-page.component.html',
  styleUrls: ['./stats-page.component.scss']
})
export class StatsPageComponent implements OnInit {
  codesalle: string = ''
  firstColorsPrecGames = ['B', 'R', 'J', 'B', 'V'];
  sumNumsPrecGames = [912, 845, 860, 872, 923];
  twelvesMulti = [
    new MultiAndTime(
      MultiplicateurVal.val1,
      new Date(2022, 1, 10, 13, 50)
    ),
    new MultiAndTime(
      MultiplicateurVal.val2,
      new Date(2022, 1, 10, 11, 50)
    ),
    new MultiAndTime(
      MultiplicateurVal.val1,
      new Date(2022, 1, 10, 12, 50)
    ),
    new MultiAndTime(
      MultiplicateurVal.val2,
      new Date(2022, 1, 10, 12, 20)
    ),
    new MultiAndTime(
      MultiplicateurVal.val1,
      new Date(2022, 1, 10, 13, 20)
    ),
    new MultiAndTime(
      MultiplicateurVal.val2,
      new Date(2022, 1, 10, 10, 50)
    ),
    new MultiAndTime(
      MultiplicateurVal.val1,
      new Date(2022, 1, 10, 13, 50)
    ),
    new MultiAndTime(
      MultiplicateurVal.val2,
      new Date(2022, 1, 10, 10, 20)
    ),
    new MultiAndTime(
      MultiplicateurVal.val1,
      new Date(2022, 1, 10, 14, 20)
    ),
    new MultiAndTime(
      MultiplicateurVal.val2,
      new Date(2022, 1, 10, 10, 20)
    ),
    new MultiAndTime(
      MultiplicateurVal.val1,
      new Date(2022, 1, 10, 14, 20)
    ),
    new MultiAndTime(
      MultiplicateurVal.val2,
      new Date(2022, 1, 10, 10, 20)
    ),
    new MultiAndTime(
      MultiplicateurVal.val1,
      new Date(2022, 1, 10, 14, 20)
    ),
  ];
  mostGetNumbers = [
    new NumAndOccurences(12, 1),
    new NumAndOccurences(22, 2),
    new NumAndOccurences(7, 3),
    new NumAndOccurences(45, 4),
    new NumAndOccurences(19, 5),
    new NumAndOccurences(75, 6),
    new NumAndOccurences(69, 7),
    new NumAndOccurences(52, 8),
    new NumAndOccurences(33, 9),
    new NumAndOccurences(60, 10),
  ];
  fiveMostGetNumbers = [
    new NumAndOccurences(42, 14),
    new NumAndOccurences(52, 13),
    new NumAndOccurences(17, 12),
    new NumAndOccurences(65, 12),
    new NumAndOccurences(39, 11),
  ];
  fiveLessGetNumbers = [
    new NumAndOccurences(11, 3),
    new NumAndOccurences(27, 3),
    new NumAndOccurences(66, 3),
    new NumAndOccurences(33, 2),
    new NumAndOccurences(77, 2),
  ];
  secondsRemaining;
  multiplicateur: any = '';
  jackpot: any = '';
  megajackpot: any = '';

  constructor(private countTimeService: CountTimeService, private api: ApiserviceService, private websocket: WebsocketService, private tokenStorage: SessionStorageService) {
    this.secondsRemaining = localStorage.getItem('timeLeft') ?? TIMECOUNT;
    this.countTimeService.secondsRemainingSubject.subscribe((sec) => {
      this.secondsRemaining = sec;
    });
    // setTimeout(() => {
    //   this.fnStatPage() 
    // }, 500);
    // setTimeout(() => {
    //   this.listBoulesTirages()
    // }, 700);
    // setTimeout(() => {
    //   this.listMultiplicateurs()
    // }, 900);
    // setTimeout(() => {
    //   this.listBoulesPlusTires()
    // }, 1100);
    // setTimeout(() => {
    //   this.listBoulesMoinsTires()
    // }, 1300);
  }

  ngOnInit(): void {
    this.codesalle = this.tokenStorage.getCodesalle()
    this.fnStatPage()
  }

  mestirages: Tirage[] = []
  boules: number[] = []

  fnStatPage(){
    try{
        this.websocket.onexecute('stat-page').then(data => {
            console.log('STAT PAGE:')
            console.log(data)
            if (data !== 'error') {
                this.multiplicateur = data.rep_algo[0].multiplicateur
                this.jackpot = data.rep_algo[0].jackpot
                this.megajackpot = data.rep_algo[0].megajackpot
                this.boulesMoinsTirees = data.lesmoins_tirees
                this.boulesPlusTirees = data.lesplus_tirees
                this.multiplicateurs = data.derniers_mult
                for (let obj of data.derniers_tirages) {
                  const tab = obj.listeBoules.split(",").map(Number)
                  tab.pop() // retirer ce dernier element qui s'est ajouter
                  this.mestirages.push(new Tirage(
                    obj.numero,
                    tab,
                    obj.multiplicateur,
                    obj.dateHeure
                  ))
                }
            } else {
                console.log('ERROR:stat-page')
            }
        })
    }catch(error){
        console.log(error.error)
    }
  }

  listBoulesTirages() {
    try {
      this.websocket.onexecute('dernierstirages').then(data => {
        if (data !== 'error') {
          for (let obj of data) {
            const tab = obj.listeBoules.split(",").map(Number)
            tab.pop() // retirer ce dernier element qui s'est ajouter
            this.mestirages.push(new Tirage(
              obj.numero,
              tab,
              obj.multiplicateur,
              obj.dateHeure
            ))
          }
        } else {
          console.log('ERROR:listBoulesTirages')
        }
      })
    } catch (error) {
      console.log(error.error);
    }
    // this.api.listDerniersTirages(this.codesalle).subscribe(data=>{
    //   for(let obj of data){
    //     const tab=obj.listeBoules.split(",").map(Number)
    //     tab.pop() // retirer ce dernier element qui s'est ajouter
    //     this.mestirages.push(new Tirage(
    //       obj.numero,
    //       tab,
    //       obj.multiplicateur,
    //       obj.dateHeure
    //     ))
    //   }
    // }) 
  }

  multiplicateurs: Multiplicateur[] = []
  listMultiplicateurs() {
    try {
      this.websocket.onexecute('derniersmultiplicateurs').then(data => {
        if (data !== 'error') {
          this.multiplicateurs = data
        } else {
          console.log('ERROR:listMultiplicateurs')
        }
      })

    } catch (error) {
      console.log(error.error);
    }
    // this.api.listDerniersMultiplicateurs(this.codesalle).subscribe(data=>{
    //   this.multiplicateurs=data
    // })
  }

  boulesPlusTirees: Boule[] = []
  listBoulesPlusTires() {
    try {
      this.websocket.onexecute('bouleslesplustirees').then(data => {
        if (data !== 'error') {
          this.listBoulesPlusTires = data
        } else {
          console.log('ERROR:listBoulesPlusTires')
        }
      })

    } catch (error) {
      console.log(error.error);
    }
    // this.api.listBoulesPlusTires(this.codesalle).subscribe(data=>{
    //   this.boulesPlusTirees=data
    // })
  }

  boulesMoinsTirees: Boule[] = []
  listBoulesMoinsTires() {
    try {
      this.websocket.onexecute('bouleslesmoinstirees').then(data => {
        if (data !== 'error') {
          this.boulesMoinsTirees = data
        } else {
          console.log('ERROR:listBoulesMoinsTires')
        }
      })

    } catch (error) {
      console.log(error.error);
    }
    // this.api.listBoulesMoinsTires(this.codesalle).subscribe(data=>{
    //   this.boulesMoinsTirees=data
    // })
  }

  getRepAlgo() {
    try {
      this.websocket.onexecute('repAlgoList').then(data => {
        console.log('TEST');
        console.log(data);
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


