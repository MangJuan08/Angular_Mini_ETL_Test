import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthenticationService } from '../../services/authentication-service';
import { Subscription } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-mini-etl-navbar',
  imports: [RouterModule, MatIconModule, MatButtonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  authenticationService = inject(AuthenticationService);
  isAuthenticatedSubscription$: Subscription;
  isAuth: any;
  router = inject(Router)
  constructor() {
    this.isAuthenticatedSubscription$ = this.authenticationService.IsAuthenticated.subscribe((data: any) => {
      this.isAuth = data;
      console.log(this.isAuth)
    });
  }

  logout() {
    this.authenticationService.IsAuthenticated.next(false);
    localStorage.clear();
    this.router.navigate(['/login']);
  }

 ngOnDestroy() {
  this.isAuthenticatedSubscription$.unsubscribe();
 }
}
