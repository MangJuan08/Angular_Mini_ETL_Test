import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication-service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-mini-etl-login-pagina',
  imports: [ReactiveFormsModule, FormsModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './login-pagina.html',
  styleUrl: './login-pagina.scss',
})
export class LoginPagina {
  loginForm: FormGroup;
  router = inject(Router)
  authenticationService = inject(AuthenticationService)
  resultLogin: any;
  hidePassword: Boolean
  constructor() {
    this.hidePassword = true;
    this.loginForm = new FormGroup({

      username: new FormControl(''),
      password: new FormControl('')
    })
  }

  submitForm(e: any) {

    let res;
    this.authenticationService.login().subscribe((data: any) => {
      this.resultLogin = data.filter((item: any) => {
        return item.username == e.value.username && item.password == e.value.password
      })

      if (this.resultLogin.length != 0) {
        localStorage.setItem('isAuthenticated', 'true');
        this.authenticationService.IsAuthenticated.next(true);
        this.router.navigate(['/transazione'])
      } else {
        localStorage.clear();
        this.router.navigate(['/login'])
      }

    })
  }
}
