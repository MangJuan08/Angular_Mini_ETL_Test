import { Component, inject } from '@angular/core';
import { ListaTransazioni } from '../../components/lista-transazioni/lista-transazioni';
import { NotificationService } from '../../services/notification-service';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { AuthenticationService } from '../../services/authentication-service';
import { Navbar } from "../../components/navbar/navbar";



@Component({
  selector: 'app-mini-etl-transazione-pagina',
  imports: [ListaTransazioni, MatIconModule, RouterModule, Navbar],
  templateUrl: './transazione-pagina.html',
  styleUrl: './transazione-pagina.scss',
})
export class TransazionePagina {
  isAuthenticated: any

  notificationService = inject(NotificationService);
  router = inject(Router);
  isAuthenticatedSubscription$: any
  authenticationService = inject(AuthenticationService)

  constructor() {
    this.isAuthenticated = false;
    this.isAuthenticatedSubscription$ = this.authenticationService.IsAuthenticated.subscribe((data: any) => {
      console.log(data)
      if (data) {
        this.isAuthenticated = data;
        console.log(data)
      } else {
        this.isAuthenticated = false
        this.router.navigate(['/login']);
      }
    });

  }

}
