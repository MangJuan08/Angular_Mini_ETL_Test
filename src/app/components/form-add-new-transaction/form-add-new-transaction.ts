import { ChangeDetectorRef, Component, Inject, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
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
import { CommonModule } from '@angular/common';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MerchantService } from '../../services/merchant-service';
import { MerchantListI } from '../../model/merchant-list';

@Component({
  selector: 'app-mini-etl-form-add-new-transaction',
  imports: [
    MatDialogContent,
    MatDialogTitle,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule, MatInputModule, MatIconModule, MatSelectModule,
    MatButtonModule, CommonModule, MatSliderModule,
    MatDialogActions,  MatDialogClose,
],
  templateUrl: './form-add-new-transaction.html',
  styleUrl: './form-add-new-transaction.scss',
})
export class FormAddNewTransaction {

  file: File | null;
  currencyList: CurrencyI[];
  statusTransazione: TransazioneStatoI[];
  formNewTransaction: FormGroup;
  listaTransazioneService = inject(ListaTransazioneService);
  notificationService = inject(NotificationService);
  http = inject(HttpClient);
  fb = inject(FormBuilder);
  uploadProgress: number;
  cdk = inject(ChangeDetectorRef);
  snackbar = inject(MatSnackBar);
  merchantService = inject(MerchantService);
  listMerchants: MerchantListI[];
  constructor(public dialogRef: MatDialogRef<FormAddNewTransaction>, @Inject(MAT_DIALOG_DATA) data: any) {
    this.merchantService.getList().subscribe((data:MerchantListI[]) => {
      this.listMerchants = data;
      this.cdk.detectChanges();
    })
    this.uploadProgress = 0;
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

    this.formNewTransaction = this.fb.group({
      transactionsArray: this.fb.array([this.fb.group({
        customerId: [0, [Validators.required]],
        amountMinor: [0, [Validators.required, Validators.min(0)]],
        currency: ['',
          [Validators.required,
          Validators.maxLength(3)]
        ],
        customerName: ['', [Validators.required]],
        merchantId: ['', [Validators.required]],
        statoTransazione: ['', [Validators.required]]
      })])
    })
    
    /* }*/
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


  get transactionsArray(): FormArray {
    return this.formNewTransaction.get('transactionsArray') as FormArray;
  }

  ngOnInit() {

    //save a draft of an incomplete form in a local storage.
    //when the form is valid, the draft form will be saved in the local storage
    //in the method addTransaction, after the form is submitted, the draft will be removed on the localStorage
    /*this.formNewTransaction.valueChanges
      .pipe(filter(() => this.formNewTransaction.valid)).subscribe((data: any) => {
        localStorage.setItem('draftTransactionForm', JSON.stringify(data.transactionsArray))
      });*/
  }
  close() {
    this.dialogRef.close();
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
    const file = {
      fileName: this.file?.name
    }
    if (this.file) {
      const formData = new FormData();
      formData.append('file', this.file as Blob);
      this.http.post("http://localhost:3002/upload", formData, {
        reportProgress: true,
        observe: 'events'
      }).subscribe((event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.uploadProgress = Math.round((event.loaded / event.total) * 100);
          this.cdk.detectChanges();
        }
      });
    }
  }

  addTransaction(): void {

    let min = 1;
    let max = 300;

    const transactions = this.formNewTransaction.get('transactionsArray');
    if (this.formNewTransaction.get('transactionsArray')?.value.length > 0) {
      this.formNewTransaction.get('transactionsArray')?.value.forEach((item: any) => {
        console.log(item)
        let f = {
         /* id: Math.floor(Math.random() * (max - min + 1)) + min,*/
          extId: Math.floor(Math.random() * (max - min + 1)) + min,
          customerId: item.customerId,
          amountMinor: item.amountMinor,
          currency: item.currency,
          stato: item.statoTransazione,
          eventTime: moment().format(),
          customerName: item.customerName,
          merchantId: item.merchantId,
        }

        this.listaTransazioneService.addNewTransaction(f).subscribe((data) => {
          this.snackbar.open('success', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-success'],
            verticalPosition: 'top',
            horizontalPosition: 'center'
          });
        });
      })
    }

  }

  addNewTransactionItem() {
    const newTransaction = this.fb.group({
      customerId: [0, [Validators.required]],
      amountMinor: [0, [Validators.required, Validators.min(0)]],
      currency: ['',
        [Validators.required,
        Validators.maxLength(3)]
      ],
      customerName: ['', [Validators.required]],
      merchantId: ['', [Validators.required]],
      statoTransazione: ['', [Validators.required]]
    });
    this.transactionsArray.push(newTransaction);
  }

  resetForm() {
    this.formNewTransaction.reset({});
    localStorage.removeItem('draftTransactionForm')
  }

  ngOnDestroy() {
    console.log('Dialog destroyed');
  }
}
