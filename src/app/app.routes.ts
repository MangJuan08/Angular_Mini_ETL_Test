import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { TransazionePagina } from './pagine/transazione-pagina/transazione-pagina';
import { ReportPagina } from './pagine/report-pagina/report-pagina';

export const routes: Routes = [   {
        path: '',
        redirectTo: 'transazione',
        pathMatch: 'full',
    },
    { 
        path: 'transazione',
        loadComponent() {
            return import( './pagine/transazione-pagina/transazione-pagina').then(m => m.TransazionePagina);
        }, 
     },
    {
        path: 'report',
        loadComponent() {
            return import( './pagine/report-pagina/report-pagina').then(m => m.ReportPagina);
        }, 
    }];
