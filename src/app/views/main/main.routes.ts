import { Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { AuthGuard } from '../auth/guard/auth.guard';
import { HomeComponent } from './home/home.component';
import { ControlePresencaComponent } from './controle-presenca/controle-presenca.component';
import {ControlePresencaListComponent} from './controle-presenca/list/list.component';
import {ControlePresencaInfoComponent} from './controle-presenca/info/info.component';

export const MAIN_ROUTES: Routes = [{
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
        { path: '', component: HomeComponent },
        {
            path: 'controle-presenca',
            component: ControlePresencaComponent,
            children: [
                { path: '', component: ControlePresencaListComponent },
                { path: 'novo', component: ControlePresencaInfoComponent },
                { path: 'nova', redirectTo: 'novo' },
                { path: ':id', component: ControlePresencaInfoComponent }
            ]
        }
    ]
}];
