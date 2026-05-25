import { Component, Inject, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import moment from 'moment';
import { ListaTransazioneService } from '../../services/lista-transazione-service';
import { ToastService } from 'ngx-toastr-notifier';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CurrencyI } from '../../model/currency';
import { TransazioneStatoI } from '../../model/transazione-stato';
import { NotificationService } from '../../services/notification-service';

@Component({
  selector: 'app-mini-etl-form-add-new-transaction',
  imports: [
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    ɵInternalFormsSharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule, MatInputModule, MatIconModule, MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './form-add-new-transaction.html',
  styleUrl: './form-add-new-transaction.scss',
})
export class FormAddNewTransaction {

  currencyList: CurrencyI[];
  statusTransazione: TransazioneStatoI[];
  toastr = inject(ToastService)
  formNewTransaction: FormGroup;
  listaTransazioneService = inject(ListaTransazioneService);
  notificationService = inject(NotificationService);

  constructor(public dialogRef: MatDialogRef<FormAddNewTransaction>) {
    this.statusTransazione = [
      { value: 'COMPLETED', viewValue: 'COMPLETED' },
      { value: 'PENDING', viewValue: 'PENDING' },
      { value: 'DELETED', viewValue: 'DELETED' },
    ];
    this.currencyList = [
      {
        "value": "USD",
        "name": "United States Dollar",
        "symbol": "$"
      },
      {
        "value": "EUR",
        "name": "Euro",
        "symbol": "€"
      },
      {
        "value": "GBP",
        "name": "British Pound Sterling",
        "symbol": "£"
      },
      {
        "value": "JPY",
        "name": "Japanese Yen",
        "symbol": "¥"
      },
      {
        "value": "INR",
        "name": "Indian Rupee",
        "symbol": "₹"
      },
      {
        "value": "AUD",
        "name": "Australian Dollar",
        "symbol": "A$"
      },
      {
        "value": "CAD",
        "name": "Canadian Dollar",
        "symbol": "C$"
      },
      {
        "value": "CHF",
        "name": "Swiss Franc",
        "symbol": "CHF"
      },
      {
        "value": "CNY",
        "name": "Chinese Yuan",
        "symbol": "¥"
      },
      {
        "value": "SGD",
        "name": "Singapore Dollar",
        "symbol": "S$"
      }
    ]
    this.formNewTransaction = new FormGroup({
      customerId: new FormControl(0, [Validators.required]),
      amountMinor: new FormControl(0, [Validators.required, Validators.min(0)]),
      currency: new FormControl('', [
        Validators.required,
        Validators.maxLength(3)
      ]),
      /*stato: new FormControl("", [Validators.required]),*/
      eventTime: new FormControl(),
      customerName: new FormControl("", [Validators.required]),
      merchantId: new FormControl("", [Validators.required]),
      statoTransazione: new FormControl("", [Validators.required])
    })
  }

  addTransaction(e: any): void {
    let min = 1;
    let max = 300;
    let f = {
      extId:  Math.floor(Math.random() * (max - min + 1)) + min,
      customerId: e.value.customerId,
      amountMinor: e.value.amountMinor,
      currency: e.value.currency,
      stato: e.value.statoTransazione,
      eventTime: moment().format(),
      customerName: e.value.customerName,
      merchantId: e.value.merchantId
    }
    this.listaTransazioneService.addNewTransaction(f).subscribe((data: any) => {
      next: () => {
        
      }
    });
    this.dialogRef.close(f);
   
  }
}
