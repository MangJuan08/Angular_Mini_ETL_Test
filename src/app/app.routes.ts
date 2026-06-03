import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [{
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
},
{
    path: 'transazione',
    loadComponent() {
        return import('./pagine/transazione-pagina/transazione-pagina').then(m => m.TransazionePagina);
    },
       canActivate: [authGuard]
},
{
    path: 'report',
    loadComponent() {
        return import('./pagine/report-pagina/report-pagina').then(m => m.ReportPagina);
    },
     canActivate: [authGuard]
},
{
    path: 'login',
    loadComponent() {
        return import('./pagine/login-pagina/login-pagina').then(m => m.LoginPagina);
    },
     canActivate: [authGuard]
},
 {
    path: 'login',
    redirectTo: 'login'
  },
];
