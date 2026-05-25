import {  Component, inject } from '@angular/core';
import { ListaTransazioni } from '../../components/lista-transazioni/lista-transazioni';
import { NotificationService } from '../../services/notification-service';


@Component({
  selector: 'app-mini-etl-transazione-pagina',
  imports: [ListaTransazioni, ],
  templateUrl: './transazione-pagina.html',
  styleUrl: './transazione-pagina.scss',
})
export class TransazionePagina {
    notificationService = inject(NotificationService);
  constructor() {
     this.notificationService.transactionAdded$.subscribe((data: any) => {
  
        console.log("newtransaction added")
      
    })
  }
}
