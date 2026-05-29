import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { UserI } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  IsAuthenticated: any = new BehaviorSubject<Boolean>(localStorage.getItem('isAuthenticated') === 'true');
  http = inject(HttpClient)


  isTheUserAuthenticated() {
    return this.IsAuthenticated;
  }

  login() {
    return this.http.get<UserI>("http://localhost:3000/users");
  }

}
