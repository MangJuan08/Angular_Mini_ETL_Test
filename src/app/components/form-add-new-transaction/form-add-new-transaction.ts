import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
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
import { filter } from 'rxjs';

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

  file: File | null;
  currencyList: CurrencyI[];
  statusTransazione: TransazioneStatoI[];
  toastr = inject(ToastService)
  formNewTransaction: FormGroup;
  listaTransazioneService = inject(ListaTransazioneService);
  notificationService = inject(NotificationService);
  fb = inject(FormBuilder);
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

    if (localStorage.getItem('draftTransactionForm')) {
      const draftData = JSON.parse(localStorage.getItem('draftTransactionForm') || '{}');
      this.formNewTransaction = this.fb.group({
        customerId: [draftData.customerId, [Validators.required]],
        amountMinor: [draftData.amountMinor, [Validators.required, Validators.min(0)]],
        currency: [draftData.currency,
        [Validators.required,
        Validators.maxLength(3)]
        ],
        customerName: [draftData.customerName, [Validators.required]],
        merchantId: [draftData.merchantId, [Validators.required]],
        statoTransazione: [draftData.statoTransazione, [Validators.required]],
        file: [null, Validators.required]
      })
    } else {
      this.formNewTransaction = this.fb.group({
        customerId: [0, [Validators.required]],
        amountMinor: [0, [Validators.required, Validators.min(0)]],
        currency: ['',
          [Validators.required,
          Validators.maxLength(3)]
        ],
        customerName: ['', [Validators.required]],
        merchantId: ['', [Validators.required]],
        statoTransazione: ['', [Validators.required]],
         file: [null, Validators.required]
      })
    }
  }
  /*
  get customerId() {
    return this.formNewTransaction.get('customerId');
  }

  get amountMinor() {
    return this.formNewTransaction.get('amountMinor');
  }

  get currency() {
    return this.formNewTransaction.get('currency');
  }

  get customerName() {
    return this.formNewTransaction.get('customerName');
  }

  get merchantId() {
    return this.formNewTransaction.get('merchantId');
  }

  get statoTransazione() {
    return this.formNewTransaction.get('statoTransazione');
  }*/

  ngOnInit() {

    //save a draft of an incomplete form in a local storage.
    //when the form is valid, the draft form will be saved in the local storage
    //in the method addTransaction, after the form is submitted, the draft will be removed on the localStorage
    this.formNewTransaction.valueChanges
    .pipe(filter(() => this.formNewTransaction.valid)).subscribe((data: any) => {
      localStorage.setItem('draftTransactionForm', JSON.stringify(data))
    });
  }

  onFileSelected(event:any) {
    this.file= event.target.files[0];

  }
  addTransaction(e: any): void {
    let min = 1;
    let max = 300;
    let f = {
      extId: Math.floor(Math.random() * (max - min + 1)) + min,
      customerId: this.formNewTransaction.value.customerId,
      amountMinor: this.formNewTransaction.value.amountMinor,
      currency: this.formNewTransaction.value.currency,
      stato: this.formNewTransaction.value.statoTransazione,
      eventTime: moment().format(),
      customerName: this.formNewTransaction.value.customerName,
      merchantId: this.formNewTransaction.value.merchantId,
    }
   /* this.listaTransazioneService.addNewTransaction(f).subscribe((data: any) => {
      next: () => {
        localStorage.removeItem('draftTransactionForm')
      }
    });*/

    const formData = new FormData();
    formData.append('file',this.file as Blob);
    console.log(this.file)
    this.listaTransazioneService.addNewFile(formData).subscribe((data: any) => {
   
    });
    /*
    localStorage.removeItem('draftTransactionForm')*/
    this.dialogRef.close(f);

  }

  resetForm() {
    this.formNewTransaction.reset({});
    localStorage.removeItem('draftTransactionForm')
  }
}
