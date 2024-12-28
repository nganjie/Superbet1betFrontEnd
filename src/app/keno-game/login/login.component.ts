import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionStorageService } from '../../services/session-storage/session-storage.service';
import { ApiserviceService } from 'src/app/service/apiservice/apiservice.service';
import { WebsocketService } from 'src/app/services/websocket/websocket.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: any = {
    cle: null
  };
  stateOptions: any[] = [];

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  lang: string = 'fr';
  value1: string = 'fr';


  displaySpinner = false;

  displayError = false;
  displaySucces = false;
  succesMessage: string = '';
  displayAffecter = false;
  displayAffecterPoste = false;
  organisations: any[] = [];

  count=5
  showlogin=false

  constructor(
    private router: Router,
    private tokenStorage: SessionStorageService,
    private http: HttpClient,
    private api: ApiserviceService,
    private websocket:WebsocketService
  ) { 
    setInterval(()=>{
      this.count--
    },1000)
  }

  token:string=''
  ngOnInit(): void {
    this.count=5
    this.showlogin=true
    // setTimeout(()=>{
    //       console.log(this.acces())
    //       if( this.acces()!=='error' || this.acces()!=undefined){
    //         if(this.acces()=='1'){
    //           this.router.navigate(['/keno-game/tirage']);
    //         }else{
    //           this.showlogin=true
    //           console.log( 'une instance utilisant cette clé est déjà ouverte !!');
    //         } 
    //       }else{
    //         this.showlogin=true
    //         console.log('Unknown Error');  
    //       }
    //     this.token = this.tokenStorage.getToken();
    // },5000)
    // this.stateOptions = [
    //   { label: 'Français', value: 'fr' },
    //   { label: 'English', value: 'en' },
    // ];
  }

  acces() {
    return this.websocket.onexecute('jeuxAcces')
    
    // this.api.acces(this.tokenStorage.getToken()).subscribe(data=>{
    //   let acces=data[0].acces
    //   if(acces=='1'){
    //     this.router.navigate(['/keno-game/tirage']);
    //   }else{
    //     this.showlogin=true
    //     console.log( 'une instance utilisant cette clé est déjà ouverte !!');
    //   } 
    // },error=>{
    //   this.showlogin=true
    //   if (error.statusText == 'Unknown Error') {
    //     console.log('Impossible de joindre le serveur');
    //   } else if (error.error.error == 'Unauthorized') {
    //     console.log('Identifiants incorrects');
    //   } else {
    //     console.log('Unknown Error');  
    //   }
    //   console.log(error)   
    // })
  }


  roles2: any[] = [];
  onSubmit(): void {
    this.displaySpinner = true;
    let cle  = this.form.cle;
    this.api.login(cle).subscribe(data => {
      let acces=data[0].acces
      let token=data[0].token
      let codesalle=data[0].codesalle
      window.sessionStorage.removeItem('auth-token')
      window.sessionStorage.removeItem('code-salle')
      window.sessionStorage.setItem('auth-token',token)
      window.sessionStorage.setItem('code-salle',codesalle)
      if(acces=='1'){
        this.displaySpinner = false;
        this.router.navigate(['/keno-game/tirage']);
      }else{
        this.errorMessage = 'Cette salle est utilisée par une autre instance!! ';
        this.displaySpinner=false
        this.showMessageError()
      }
    },
    (err) => {
      console.log(err.error);
      if (err.statusText == 'Unknown Error') {
        this.errorMessage = 'Impossible de joindre le serveur';
      } else if (err.error.error == 'Unauthorized') {
        this.errorMessage = 'Identifiants incorrects';
      } else {
        this.errorMessage = 'Unknown Error';
      }
      this.displaySpinner = false;
      this.showMessageError()
    })
  }

  showMessageError() {
    this.isLoginFailed = true;
    setTimeout(() => {
      this.isLoginFailed = false;
    }, 4000);
  }

  reloadPage(): void {
    window.location.reload();
  }

  closeSucces() {
    this.displaySucces = false;
  }

  closeError() {
    this.displayError = false;
  }


}
function typeOf(data: any): boolean {
  throw new Error('Function not implemented.');
}

