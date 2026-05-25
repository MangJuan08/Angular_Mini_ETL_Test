import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { listaTransazioneI } from '../model/list-transactions';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ListaTransazioneService {
  http = inject(HttpClient);


  getList() {
    return this.http.get<listaTransazioneI>("http://localhost:3000/transactions");
  }

  addNewTransaction(newTransactionBody: any) {
    return this.http.post<listaTransazioneI>("http://localhost:3000/transactions", newTransactionBody);
  }



}
