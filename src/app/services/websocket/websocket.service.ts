import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { SessionStorageService } from '../session-storage/session-storage.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  socket = new WebSocket(environment.socket); //92.113.29.142

  constructor() { }

  onopen() {
    this.socket.onopen = () => {
      console.log('Connected to WebSocket server');
    };
  }

  
  onexecute(type: any): Promise<any>  {
   return new Promise((resolve, reject) => {
    let rep: any;
    let code_salle = window.sessionStorage.getItem('code-salle')
    let tirageID = window.sessionStorage.getItem('tirageID')
    let token = window.sessionStorage.getItem('auth-token')
    let cle = window.sessionStorage.getItem('cle')

    const datepipe: DatePipe = new DatePipe('en-US')
    const dateactuelle = new Date()
    let dateDebut = datepipe.transform(dateactuelle, 'YYYY-MM-dd')
    let heureDebut = datepipe.transform(dateactuelle, 'HH:mm:ss')
    this.socket.send(JSON.stringify({ type: type, code_salle: code_salle, cle: cle, token: token, tirageID: tirageID, dateDebut: dateDebut, heureDebut: heureDebut }));
    this.socket.onmessage = (event) => {
      if (typeof event.data === 'string') {
        try {
          rep = JSON.parse(event.data);
          resolve(rep)
        } catch (error) {
          reject('error') ; // Sortir si l'analyse échoue
        }
      }
    };
    
  })
  }


  onclose() {
    this.socket.onclose = () => {
      console.log('Disconnected from WebSocket server');
    };
  }

}
