import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  
  newTransactionAdded = new Subject();
  transactionAdded$ = this.newTransactionAdded.asObservable();

  notifyNewTransactionAdded(newTransaction:any) {
    this.newTransactionAdded.next(newTransaction)
  }
}
