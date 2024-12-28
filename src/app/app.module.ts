import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PariTypesPageComponent } from './keno-game/pari-types/pari-types-page/pari-types-page.component';
import { StatsPageComponent } from './keno-game/stats/stats-page/stats-page.component';
import { TiragePageComponent } from './keno-game/tirage/tirage-page/tirage-page.component';
import { BallsContainerComponent } from './keno-game/shared-components/balls-container/balls-container.component';
import { PariItemComponent } from './keno-game/pari-types/pari-item/pari-item.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BetGetSavePageComponent } from './caissiere/bet-get-save/bet-get-save-page/bet-get-save-page.component';
import { CurrencyPipe, registerLocaleData } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import localeFr from '@angular/common/locales/fr';
import { ModalErrorComponent } from './caissiere/bet-get-save/modal-error/modal-error.component';

import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './keno-game/login/login.component';

//import { DialogModule } from 'primeng/dialog';

registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    PariTypesPageComponent,
    StatsPageComponent,
    TiragePageComponent,
    BallsContainerComponent,
    PariItemComponent,
    BetGetSavePageComponent,
    ModalErrorComponent,
    LoginComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    //DialogModule,
    MDBBootstrapModule.forRoot()
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  providers: [CurrencyPipe, { provide: LOCALE_ID, useValue: 'fr-FR'}],
  bootstrap: [AppComponent]
})
export class AppModule { }


