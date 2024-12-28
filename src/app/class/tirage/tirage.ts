import { DatePipe } from "@angular/common";
import { ApiserviceService } from "src/app/service/apiservice/apiservice.service";

export class Tirage {
    
    TirageID:string='';
    userID:string='';
    organisationID:string='';
    dateCreation:string='';
    listeBoulesTires:string='';
    multiplicateur:number=1;
    jackpot:string='';
    dateDebut:any;
    dateFin:string='';
    code_salle:string='';
    heureDebut:string=''
    numtirage:any;
    heure:any;

    constructor( _code_salle:string){
        this.code_salle=_code_salle
        const datepipe:DatePipe=new DatePipe('en-US')
        const dateactuelle=new Date()
        this.dateDebut=datepipe.transform(dateactuelle,'YYYY-MM-dd')
        this.heureDebut=datepipe.transform(dateactuelle,'HH:mm:ss')
    }
    
}
