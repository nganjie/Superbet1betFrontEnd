import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { TypePari } from '../models/type-pari';
import { multiEventsBetOnColors, multiEventsBetOnNums, binaryBets } from '../helpers/paris-listing';
import { ballColors } from '../helpers/enums';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { ModalErrorComponent } from '../modal-error/modal-error.component';

@Component({
  selector: 'app-bet-get-save-page',
  templateUrl: './bet-get-save-page.component.html',
  styleUrls: ['./bet-get-save-page.component.scss']
})
export class BetGetSavePageComponent implements OnInit {

  montantMise = '';
  pronostique = '';
  pariSelectedCoast = 0;
  pariSelectedName = '';
  lastTirageNum!: number;
  minMise = '200 FCFA';
  gainEventuel = '';
  modalRef!: MDBModalRef;
  multiValue = false;
  codePari = '';
  nomPari = '';
  currencyPipe = new CurrencyPipe('fr-FR');
  errorSelectionBetDisplayed = false;

  constructor(
    private modalService: MDBModalService,
  ) {
    this.lastTirageNum = 0;

  }

  betsAvailables: TypePari[] = [
    new TypePari('Keno Simple', 'Choix simple entre 1 et 10', '32.11'),
    new TypePari('Non sortant', 'n’apparaissent pas lors du tirage', '-'),
    new TypePari('Tout dedans', 'apparaissent lors du tirage ', '+'),
    new TypePari('Couleur', 'Couleur première boule', '*'),
    new TypePari('Couleur', 'Couleur dernière boule', '/'),
    new TypePari('Somme 5-', 'Somme des 5 premiers inférieure à 202.5', '5-'),
    new TypePari('Somme 5+', 'Somme des 5 premiers supérieure à 202.5', '5+'),
    new TypePari('Somme 20-', 'Somme totale inférieure à 805.2', '20-'),
    new TypePari('Somme 20+', 'Somme totale supérieure à 805.2', '20+'),
    new TypePari('Premier 1-', 'Premier numéro inférieur à 40.5', '1-'),
    new TypePari('Premier 1+', 'Premier numéro supérieure à 40.5', '1+'),
    new TypePari('Premier odd', 'Premier numéro pair', '188'),
    new TypePari('Dernier odd', 'Dernier numéro pair', '189'),
    new TypePari('Premier even', 'Premier numéro impair', '198'),
    new TypePari('Dernier even', 'Dernier numéro impair', '199'),
    new TypePari('Premier S1', 'Premier numéro sera seul chiffre', '200'),
    new TypePari('Dernier S2', 'Dernier numéro sera seul chiffre', '201'),
  ];


  ngOnInit(): void {
  }

  numericOnly(event: KeyboardEvent): boolean {
    const patt = /^([0-9])$/;
    const result = patt.test(event.key);
    if (event.key === '0' && this.montantMise === ''){
      return false;
    }
    return result;
  }

  checkBinaryBet(): boolean {
    const binaryBetSelect = binaryBets.find((val) => val.shortcut === this.codePari);
    if (binaryBetSelect){
      this.pariSelectedName = binaryBetSelect?.label ?? '';
      this.pronostique = 'Oui';
      this.pariSelectedCoast = binaryBetSelect?.coast ?? 0;
      return true;
    }
    if (!this.errorSelectionBetDisplayed)
      this.modalRef = this.modalService.show(ModalErrorComponent, this.getModalOptions({
        contentText: "La sélection que vous avez entrée n'est pas valide."
      }, 'modal-dialog modal-notify modal-danger'));
    return false;
  }

  checkBetOnColor(): boolean {
    const colorsId = [1, 2, 3, 4];
    const colorId = Number(this.codePari.charAt(1));    
    const codeStartChar = this.codePari.charAt(0);
    if ((codeStartChar === '/' || codeStartChar ==='*')){
      if (colorsId.includes(colorId) && this.codePari.length === 2){
        const betOnColorSelect = multiEventsBetOnColors.find(val => val.shortcut === codeStartChar); 
        this.pariSelectedName = betOnColorSelect?.betName?? '';
        this.pronostique = ballColors[colorId-1];
        this.pariSelectedCoast = betOnColorSelect?.coasts.find(val => val.color === this.pronostique)?.coast ?? 0;
        return true;
      }
      else {
        const errorText = "La sélection que vous avez entrée n'est pas valide. Le caractère '/' ou '*' doit être suivi d'un chiffre allant de 1 à 4.";
        this.modalRef = this.modalService.show(ModalErrorComponent, this.getModalOptions({
          contentText: errorText
        }, 'modal-dialog modal-notify modal-danger'));
        this.errorSelectionBetDisplayed = true;
        return false;
      }
    }
    return false;
  }

  checkBetOnNums(): boolean {
    const codeStartChar = this.codePari.charAt(0);
    let errorText = '';
    if (codeStartChar === '+' || codeStartChar === '-'){
      const numsStr = this.codePari.slice(1).split('-');
      try {
        const nums0 = numsStr.map((val) => Number(val));
        const nums: number[] = []
        for (let num of nums0){
          if ((num == null || nums.includes(num) || num < 1 || num > 80 || Math.floor(num) !== num) ){
            throw new Error('err');
          }
          else {
            nums.push(num);
          }
        }
        if ((nums0.length > 10 && codeStartChar === '-')){
          errorText = "Si le pari que vous choisissez c'est le \"Non sortant\", vous ne pouvez pas entreer une série de plus de 10 nombres. "
        }
        if (nums0.length > 6 && codeStartChar === '+'){
          errorText = "Si le pari que vous choisissez c'est le \"Tout dedans\", vous ne pouvez pas entreer une série de plus de 6 nombres. "
        }
        this.pronostique = this.codePari.slice(1);
        const pariSelect = multiEventsBetOnNums.find((val) => val.shortcut === codeStartChar);
        this.pariSelectedName = pariSelect?.betName ?? '';
        this.pariSelectedCoast = pariSelect?.coasts.find(val => val.num === nums.length)?.coast ?? 0;
        return true;
      }
      catch(e){
        errorText = "La sélection que vous avez saisie n'est pas valide. A la suite de '+' ou '-', vous devez entrer une série de nombre entiers compris dans l'intervalle [1, 80] et en les séparant d'un '-'."
      }
      finally {
        if (errorText){
          this.modalRef = this.modalService.show(ModalErrorComponent, this.getModalOptions({
            contentText: errorText
          }, 'modal-dialog modal-notify modal-danger'));
          this.errorSelectionBetDisplayed = true;
          return false;
        }
      }
    }
    return false;
  }

  onEnterPress(event: KeyboardEvent): void {
    if (event.key === 'Enter'){
      this.errorSelectionBetDisplayed = false;
      if (this.checkBetOnNums()){
        this.updateGain();
      }
      else if (this.checkBetOnColor()){
        this.updateGain();
      }
      else if (this.checkBinaryBet()){
        this.updateGain();
      }
    }
  }

  updateGain(): void {
    const numMontantMise = this.transformStrMoneyIntoNumber(this.montantMise) * this.pariSelectedCoast;
    this.gainEventuel = this.currencyPipe.transform(numMontantMise, 'FCFA', 'symbol', '1.0-0', 'fr-FR') ?? '';
  }

  fillInCodePariField(event: KeyboardEvent): boolean {
    const patt = /^[-+*/]$|(^3(2|$)(\.|$)(1|$)(1|$)$)|(^[51]([-+]|$)$)|(^2(0|$)([-+01]|$)$)|(^1([89]|$)([89]|$)$)/;
    return patt.test(this.codePari + event.key);
  }

  fillInFields(event: Event): void {
    this.updateGain();
  }

  onBlurAmountField(event: FocusEvent): void {
    if (this.montantMise !== ''){
      this.montantMise = this.currencyPipe.transform(this.montantMise, 'FCFA', 'symbol', '1.0-0', 'fr-FR') ?? '';
    }
  }

  onFocusAmountField(event: FocusEvent): void {
    if (this.montantMise !== ''){
      this.montantMise = this.transformStrMoneyIntoNumber(this.montantMise) + '';
    }
  }

  transformStrMoneyIntoNumber(moneyStr: string): number {
    const newMoneyStr = moneyStr.replace('FCFA', '');
    return Number(newMoneyStr.replace(/\s/g, ''));
  }

  getModalOptions(data: any, cssClass: string, ignoreBackdropClick?: boolean): any {
    return  {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: ignoreBackdropClick ? true : false,
      class: cssClass,
      containerClass: '',
      animated: true,
      data
    };
  }

}

