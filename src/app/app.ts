import { Component, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Navbar } from "./components/navbar/navbar";
import { AuthenticationService } from './services/authentication-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [ RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Angular_Mini_ETL_Test');

  constructor() {

  }
}
