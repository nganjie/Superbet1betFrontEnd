import {
  HttpClient,
  HttpEvent,
  HttpHeaders,
  HttpRequest,
} from '@angular/common/http';

//import { ConfigService } from '../../config.service';

import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Tirage } from 'src/app/class/tirage/tirage';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {


  urlSelectBoul: string = ''
  urlInsertTirage: string = ''
  urlDerniersMultiplicateur: string = ''

  urlListDerniersTirages:string=''
  urlListMultiplicateursTirages:string=''
  urlListBoulesPlusTires:string=''
  urlListBoulesMoinsTires:string=''

  urlListRepAlgo:string=''
  urlUpdSalleSync:string=''

  urlAccesKeno:string=''
  urlLoginKeno:string=''
  urlLogoutKeno:string=''

  constructor(private http: HttpClient
    // private appConfigService: ConfigService
  ) {
    //const urlserveur = this.appConfigService.getConfig().serverIP;
    //this.urlBoul=urlserveur+'jeu/boulle' environment.url+
    this.urlSelectBoul = environment.url + 'algoD'
    this.urlInsertTirage = environment.url + 'tirage'

    this.urlListDerniersTirages=environment.url + 'dernierstirages'
    this.urlListMultiplicateursTirages=environment.url + 'derniersmultiplicateurs' 
    this.urlListBoulesPlusTires=environment.url + 'bouleslesplustirees'  
    this.urlListBoulesMoinsTires=environment.url + 'bouleslesmoinstirees'

    this.urlListRepAlgo=environment.url + 'repAlgoList'
    this.urlUpdSalleSync=environment.url + 'salleSynchUpdate'

    this.urlAccesKeno=environment.url + 'jeuxAcces'
    this.urlLoginKeno=environment.url + 'jeuxLogin'
    this.urlLogoutKeno=environment.url + 'jeuxLogout'

  }


  public algoD(code_salle: string, tirageID: any): Observable<any> {
    return this.http.get(this.urlSelectBoul + '/' + code_salle + '/' + tirageID);
  }

  public insertTirage(tirage: Tirage): Observable<any> {
    return this.http.get(this.urlInsertTirage + '/' + tirage.code_salle + '/' + tirage.dateDebut + '/' + tirage.heureDebut);
  }

  public listDerniersTirages(code_salle: string): Observable<any>{
    return this.http.get(this.urlListDerniersTirages+'/'+code_salle)
  }

  public listDerniersMultiplicateurs(code_salle: string): Observable<any>{
    return this.http.get(this.urlListMultiplicateursTirages+'/'+code_salle)
  }

  public listBoulesPlusTires(code_salle: string): Observable<any>{
    return this.http.get(this.urlListBoulesPlusTires+'/'+code_salle)
  }

  public listBoulesMoinsTires(code_salle: string): Observable<any>{
    return this.http.get(this.urlListBoulesMoinsTires+'/'+code_salle)
  }
  
  public listRepAlgo(code_salle: string): Observable<any>{
    return this.http.get(this.urlListRepAlgo+'/'+code_salle)
  }

  public updSalleSync(code_salle: string): Observable<any>{
    return this.http.get(this.urlUpdSalleSync+'/'+code_salle)
  }

  
  public acces(token: string): Observable<any> {
    return this.http.get(this.urlAccesKeno + "/" + token );
  }

  public login(cle:string){
    return this.http.get(this.urlLoginKeno + "/" + cle );
  }

  public logout(token:string){
    return this.http.get(this.urlLogoutKeno + "/" + token );
  }

  
}


