import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { TIMECOUNT } from '../helpers/constants';

@Injectable({
  providedIn: 'root'
})
export class CountTimeService {

  secondsRemaining = TIMECOUNT;
  secondsRemainingSubject: Subject<number> = new Subject<number>();
  pageChangesSeconds = [10, 20, 40, 30, 40, 40];
  views = ['keno-game/stats', 'keno-game/paris-types'];

  constructor(private router: Router) {
  }

  initAction(): void {
    let ind = 0;
    let timeCounter = 0;
    let viewsInd = 0;
    this.router.navigate([this.views[1]]);
    const pid = setInterval(() => {
      this.secondsRemaining -= 1;
      this.secondsRemainingSubject.next(this.secondsRemaining);
      if (timeCounter === this.pageChangesSeconds[ind]){
        localStorage.setItem('timeLeft', this.secondsRemaining + '');
        timeCounter = 0;
        ind += 1;
        this.router.navigate([this.views[viewsInd]]);
        viewsInd = 1 - viewsInd;
      }
      else {
        timeCounter += 1;
      }
      if (this.secondsRemaining === 0){
        clearInterval(pid);
        this.router.navigate(['keno-game/tirage']);
        this.secondsRemaining = TIMECOUNT;
      }
    }, 1000);
  }

}
