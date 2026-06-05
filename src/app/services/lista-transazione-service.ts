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
    return this.http.get<listaTransazioneI>("http://localhost:3001/transactions");
  }

  addNewTransaction(newTransactionBody: any) {
    return this.http.post<listaTransazioneI>("http://localhost:3001/transactions", newTransactionBody);
  }

  addNewFile(file: any) {
     return this.http.post("http://localhost:3002/upload", file);
  }

}
