import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import moment from 'moment';
@Component({
  selector: 'app-mini-etl-lista-transazioni-per-data',
  imports: [MatListModule, CommonModule],
  templateUrl: './lista-transazioni-per-data.html',
  styleUrl: './lista-transazioni-per-data.scss',
})
export class ListaTransazioniPerData {
  @Input() merchantGroup: any;

   transformDate(valueDate: any) {
      return moment(valueDate).format('L')
    }
}
