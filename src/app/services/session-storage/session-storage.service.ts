import { Injectable } from '@angular/core';


const TOKEN_KEY = 'auth-token';
const CODE_SALLE= 'code-salle'
const USER_KEY = 'auth-user';
const PROFIL_KEY = '0';
const ITEM_KEY = 'item';
const LANG_KEY = 'fr';
const MODULE_KEY = 'module';
const ORG_KEY = 'organisation';
const ORG_LIB = 'LibelleOrganisation';
const INDEX_MENU = 'indexmodule';
const MINUTE_KEY='minutes'
const SECONDE_KEY='secondes'
const TOTALSECONDE_KEY='totalsecondes'

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() { }

  signOut(): void { window.sessionStorage.clear(); }

  public saveTotalSecondes(_value:string): void{
    window.sessionStorage.removeItem(TOTALSECONDE_KEY); 
    window.sessionStorage.setItem(TOTALSECONDE_KEY, _value);
  }

  public getTotalSecondes(): any { return window.sessionStorage.getItem(MINUTE_KEY); }

  public saveMinutes(_value:string): void{
      window.sessionStorage.removeItem(MINUTE_KEY); 
      window.sessionStorage.setItem(MINUTE_KEY, _value);
  }

  public getMinutes(): any { return window.sessionStorage.getItem(MINUTE_KEY); }

  public saveSecondes(_value:string): void{
    window.sessionStorage.removeItem(SECONDE_KEY); 
    window.sessionStorage.setItem(SECONDE_KEY, _value);
  }

  public getSecondes(): any { return window.sessionStorage.getItem(SECONDE_KEY); }

  public saveToken(token: string): void { window.sessionStorage.removeItem(TOKEN_KEY); window.sessionStorage.setItem(TOKEN_KEY, token); }

  public getToken(): any { return window.sessionStorage.getItem(TOKEN_KEY); }

  public clearToken(){window.sessionStorage.removeItem(CODE_SALLE);}

  public saveCodesalle(codesalle: string): void { window.sessionStorage.removeItem(CODE_SALLE); window.sessionStorage.setItem(TOKEN_KEY, codesalle); }

  public getCodesalle(): any {  return window.sessionStorage.getItem(CODE_SALLE); }

  public clearCodesalle(){window.sessionStorage.removeItem(CODE_SALLE);}


  public saveUser(user: any): void { window.sessionStorage.removeItem(USER_KEY); window.sessionStorage.setItem(USER_KEY, JSON.stringify(user)); }
  public saveProfil(profil: any): void {
    window.sessionStorage.removeItem(PROFIL_KEY);
    window.sessionStorage.setItem(PROFIL_KEY, JSON.stringify(profil));
  }
  public saveOrganisation(organisationID: string, libelleFr: string): void {
    window.sessionStorage.removeItem(ORG_KEY);
    window.sessionStorage.setItem(ORG_KEY, organisationID);
    window.sessionStorage.removeItem(ORG_LIB);
    window.sessionStorage.setItem(ORG_LIB, libelleFr);
  }

  public getOrganisation(): any { return window.sessionStorage.getItem(ORG_KEY); }

  public getOrganisationLibelleFr(): any { return window.sessionStorage.getItem(ORG_LIB); }

  public savePoste(posteID: string[]): void { let i: number = 0; for (let p of posteID) { i = i + 1; window.sessionStorage.removeItem('poste' + i); window.sessionStorage.setItem('poste' + i, p); } }

  public getPostes(): any { let postes: any[] = []; for (let i = 1; i <= window.sessionStorage.length; i++) { postes.push(window.sessionStorage.getItem('poste' + i)); } return postes; }

  public saveActivePoste(posteID: string): void { window.sessionStorage.removeItem('activePoste'); window.sessionStorage.setItem('activePoste', posteID); }

  public getActivePoste(): any { return window.sessionStorage.getItem('activePoste'); }


  public saveModule(module: string): void { window.sessionStorage.removeItem(MODULE_KEY); window.sessionStorage.setItem(MODULE_KEY, module); }

  public getCurrentModule() { return window.sessionStorage.getItem(MODULE_KEY); }

  public getUser(): any { const user = window.sessionStorage.getItem(USER_KEY); if (user) { return JSON.parse(user); } return {}; }
  public getProfil(): any { const profil = window.sessionStorage.getItem(PROFIL_KEY); if (profil) { return JSON.parse(profil); } return {}; }


  public saveRole(roles: string[]): void { let i: number = 0; for (let ROLE_KEY of roles) { i = i + 1; window.sessionStorage.removeItem('R' + i); window.sessionStorage.setItem('R' + i, ROLE_KEY) } }

  public getRoles(): any { let roles: any[] = []; for (let i = 1; i <= window.sessionStorage.length; i++) { roles.push(window.sessionStorage.getItem('R' + i)); } return roles; }

  public saveTicketRole(ticketRoles: string[]): void { let i: number = 0; for (let TICKET_ROLE_KEY of ticketRoles) { i = i + 1; window.sessionStorage.removeItem('TR' + i); window.sessionStorage.setItem('TR' + i, TICKET_ROLE_KEY); } }

  public getTicketRoles(): any { let ticketRoles: any[] = []; for (let i = 1; i <= window.sessionStorage.length; i++) { ticketRoles.push(window.sessionStorage.getItem('TR' + i)); } return ticketRoles; }



  public saveActiveItem(item: string): void { window.sessionStorage.removeItem(ITEM_KEY); window.sessionStorage.setItem(ITEM_KEY, item); }
  public saveActiveLang(item: string): void {
    console.log(item);
    window.sessionStorage.removeItem(LANG_KEY); window.sessionStorage.setItem(LANG_KEY, item);
  }

  public getActiveItem() {
    let res: any; if
      (window.sessionStorage.getItem(ITEM_KEY) == null) {
      res = 'accueil'
    } else { res = window.sessionStorage.getItem(ITEM_KEY); } return res;
  }
  public getActiveLang() {
    let res: any; if
      (window.sessionStorage.getItem(LANG_KEY) == null) {
      res = 'fr'
    } else { res = window.sessionStorage.getItem(LANG_KEY); } return res;
  }

  getAll() {
    console.log(this.getRoles());
    // console.log(this.getTicketRoles());
    // console.log(this.getToken());
    // console.log(this.getUser());
    console.log(this.getOrganisation());
    console.log(this.getActiveItem());
    console.log(this.getCurrentModule());
  }

  public saveActiveMenu(item: string): void { window.sessionStorage.removeItem(INDEX_MENU); window.sessionStorage.setItem(INDEX_MENU, item); }

  public getActiveMenu() { return window.sessionStorage.getItem(INDEX_MENU); }

}
