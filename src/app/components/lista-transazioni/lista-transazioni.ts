import { ChangeDetectorRef, Component, inject, signal, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ListaTransazioneService } from '../../services/lista-transazione-service';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import {
  MatDialog,
} from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormAddNewTransaction } from '../form-add-new-transaction/form-add-new-transaction';
import moment from 'moment';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { NotificationService } from '../../services/notification-service';
import { filter } from 'rxjs';
import { listaTransazioneI } from '../../model/list-transactions';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'MM/DD/YYYY',
  },
  display: {
    dateInput: 'MM/DD/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'MM/DD/YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


@Component({
  selector: 'app-mini-etl-lista-transazioni',
  imports: [MatTableModule, MatExpansionModule,
    MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule,
    MatDatepickerModule, ReactiveFormsModule, MatSortModule, CommonModule, MatSelectModule, MatProgressSpinnerModule, MatCardModule, MatButtonModule
  ],
  templateUrl: './lista-transazioni.html',
  styleUrl: './lista-transazioni.scss',
  providers: [provideNativeDateAdapter(MY_DATE_FORMATS)]
})
export class ListaTransazioni {


  reportSubscription$: any;
  filterForm: FormGroup;
  listaTransazioneService = inject(ListaTransazioneService);
  displayedColumns: Array<any>;
  dataSource: any
  notificationService = inject(NotificationService)
  cdk = inject(ChangeDetectorRef);
  router = inject(Router);
  resultFilterData: any;
  listaTransazione: any;
  statusTransazione: any;
  showTable: Boolean;
  timer: any;
  readonly panelOpenState = signal(false);
  readonly dialog = inject(MatDialog);

  constructor() {
    this.showTable = false;
    this.displayedColumns = ['extId', 'customerId', 'customerName', 'amountMinor', 'currency', 'stato', 'eventTime', 'merchantId'];
    this.statusTransazione = [
      { value: 'COMPLETED', viewValue: 'COMPLETED' },
      { value: 'PENDING', viewValue: 'PENDING' },
      { value: 'DELETED', viewValue: 'DELETED' },
    ];
    this.filterForm = new FormGroup({
      customerName: new FormControl(''),
      dataDa: new FormControl(<Date | null>(null)),
      dataA: new FormControl(<Date | null>(null)),
      statoTransazione: new FormControl('')
    })

    /*this.notificationService.transactionAdded$.subscribe((data: any) => {
      if (data.length > 0) {
        console.log("newtransaction added")
      }
    })*/

  }

  ngOnInit() {
    this.timer = setInterval(() => {
      this.showTableTransactions();
    }, 2000)

  }

  showTableTransactions() {
    this.listaTransazioneService.getList().subscribe((data: any) => {
      this.dataSource = new MatTableDataSource(data);
      this.listaTransazione = data;
      this.cdk.detectChanges();
    })

        this.showTable = true;
  }
  

  transformDate(valueDate: any) {
    return moment(valueDate).format('L')
  }

  filterF(e: any) {
    this.showTable = false;

    this.resultFilterData = this.listaTransazione.filter((parameter: any) => {
      const itemDate = moment(parameter.eventTime);
      const startDate = moment(e.value.dataDa);
      const endDate = moment(e.value.dataA);
      return itemDate.isBetween(startDate, endDate, 'day', '[]') && parameter.customerName == e.value.customerName && parameter.stato == e.value.statoTransazione;
    });
    console.log(this.dataSource.data)
    this.dataSource.data = []
     console.log(this.dataSource.data)
    this.dataSource = new MatTableDataSource(this.resultFilterData);
    this.showTable = true;
  }


  refreshTable() {
    this.showTable = false
    this.timer = setInterval(() => {
      this.listaTransazioneService.getList().subscribe((data: any) => {
        this.dataSource = new MatTableDataSource(data);
        this.showTable = true;
        this.listaTransazione = data;
        this.filterForm.reset();
        this.cdk.detectChanges();
      })
    }, 2000)
  }


  openDialog() {
    let d = this.dialog.open(FormAddNewTransaction, {
      width: '1000px',
      height: '450px'
    });

    this.dialog.afterAllClosed.subscribe((data: any) => {
      this.notificationService.notifyNewTransactionAdded(data);
    })
  }
  
  ngOnDestroy() {
    clearInterval(this.timer)
  }
}
