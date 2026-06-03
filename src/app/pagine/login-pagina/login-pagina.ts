import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication-service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UserI } from '../../model/user';

@Component({
  selector: 'app-mini-etl-login-pagina',
  imports: [ReactiveFormsModule, FormsModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './login-pagina.html',
  styleUrl: './login-pagina.scss',
})
export class LoginPagina {
  router = inject(Router)
  authenticationService = inject(AuthenticationService)
  resultLogin: any;
  hidePassword: Boolean
  loginForm: FormGroup;
  fb = inject(FormBuilder);
  constructor() {
    this.hidePassword = true;
    this.loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  })
  }

  /*get password() {
    return this.loginForm.get('password');
  }
  get username() {
    return this.loginForm.get('username');
  }*/

  submitForm(e: any) {
    const form = {
      username: this.loginForm.get('username')?.value,
      password: this.loginForm.get('password')?.value
    }

    this.authenticationService.login().subscribe((data: any) => {
      this.resultLogin = data.filter((item: UserI) => {
        return item.username == form.username && item.password == form.password
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
