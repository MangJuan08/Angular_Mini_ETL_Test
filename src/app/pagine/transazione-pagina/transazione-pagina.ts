import { Component, inject } from '@angular/core';
import { ListaTransazioni } from '../../components/lista-transazioni/lista-transazioni';
import { NotificationService } from '../../services/notification-service';
import { AuthenticationService } from '../../services/authentication-service';


@Component({
  selector: 'app-mini-etl-transazione-pagina',
  imports: [ListaTransazioni,],
  templateUrl: './transazione-pagina.html',
  styleUrl: './transazione-pagina.scss',
})
export class TransazionePagina {
  isAuthenticated: any

  notificationService = inject(NotificationService);
  /*
  isAuthenticatedSubscription$: any
  authenticationService = inject(AuthenticationService)
  */
  constructor() {
    /*this.isAuthenticated = false;
    this.isAuthenticatedSubscription$ = this.authenticationService.IsAuthenticated.subscribe((data: any) => {
      if (data) {
        this.isAuthenticated = data;
      } else {
        this.isAuthenticated = false
      }
    });*/
    this.notificationService.transactionAdded$.subscribe((data: any) => {

      console.log("newtransaction added")

    })
  }
}
