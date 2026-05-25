import { CommonModule } from '@angular/common';
import { Component, Input, signal } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import moment from 'moment';

@Component({
  selector: 'app-mini-etl-report-transactions-per-merchant-id',
  imports: [MatListModule, MatExpansionModule, CommonModule],
  templateUrl: './report-transactions-per-merchantId.html',
  styleUrl: './report-transactions-per-merchantId.scss',
})
export class ReportTransactionsPerMerchantId {
    @Input() merchantGroup: any;
    @Input() groupedArray: any

    readonly panelOpenState = signal(false);
    constructor() {
    }
    ngOnInit() {
    }

     transformDate(valueDate: any) {
    return moment(valueDate).format('L')
  }
}
