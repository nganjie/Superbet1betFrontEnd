import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BetGetSavePageComponent } from './caissiere/bet-get-save/bet-get-save-page/bet-get-save-page.component';
import { PariTypesPageComponent } from './keno-game/pari-types/pari-types-page/pari-types-page.component';
import { StatsPageComponent } from './keno-game/stats/stats-page/stats-page.component';
import { TiragePageComponent } from './keno-game/tirage/tirage-page/tirage-page.component';
import { LoginComponent } from './keno-game/login/login.component';


const routes: Routes = [
    {
        path: '', redirectTo: 'keno-game', pathMatch: 'full'
    },
    {
        path: 'keno-game',
        children: [
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            { path: 'login', component: LoginComponent },
            { path: 'stats', component: StatsPageComponent },
            { path: 'tirage', component: TiragePageComponent },
            { path: 'paris-types', component: PariTypesPageComponent }
        ]
    },
    {
        path: 'caissiere',
        children: [
            { path: '', redirectTo: 'bet-save', pathMatch: 'full' },
            { path: 'bet-save', component: BetGetSavePageComponent },
        ]
    }


];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
