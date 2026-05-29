import { ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { Subscription } from 'rxjs';
import { GroupedTransactions } from '../../model/grouped-transactions';
import { listaTransazioneI } from '../../model/list-transactions';
import { AuthenticationService } from '../../services/authentication-service';
import { ListaTransazioneService } from '../../services/lista-transazione-service';
import { MatIconModule } from '@angular/material/icon';
import { ReportTransactionsPerMerchantId } from '../report-transactions-per-merchant-id/report-transactions-per-merchantId';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-mini-etl-list-report-transazione',
  imports: [MatIconModule, ReportTransactionsPerMerchantId, MatButtonModule],
  templateUrl: './list-report-transazione.html',
  styleUrl: './list-report-transazione.scss',
})
export class ListReportTransazione {

  readonly panelOpenState = signal(false);
  listaTransazioneService = inject(ListaTransazioneService);
  authenticationService = inject(AuthenticationService)
  listaTransazione: any;
  transactions: listaTransazioneI[] = [];
  groupedArray: GroupedTransactions[] = [];
  cdk = inject(ChangeDetectorRef);
  showReport: Boolean;
  groupedTransactions: any;
  timer: any;
  isAuthenticated: Boolean;
  isAuthenticatedSubscription$: Subscription;
  constructor() {
    this.isAuthenticated = false;
    this.isAuthenticatedSubscription$ = this.authenticationService.IsAuthenticated.subscribe((data: any) => {
      if (data) {
        this.isAuthenticated = data;
      } else {
        this.isAuthenticated = false
      }
    });

    this.showReport = false;
    this.listaTransazioneService.getList().subscribe((data: any) => {
      this.listaTransazione = data;
      this.cdk.detectChanges();
    })
  }

  ngOnInit(): void {

    this.timer = setInterval(() => {
      this.regroupTransactionsByMerchantId();
    }, 2000)
  }

  regroupTransactionsByMerchantId() {
    const groupedTransactions = this.listaTransazione.reduce(
      (acc: any, transaction: any) => {
        const { merchantId, eventTime } = transaction;
        if (!acc[merchantId]) {
          acc[merchantId] = {};
        }
        if (!acc[merchantId][eventTime]) {
          acc[merchantId][eventTime] = [];
        }
        acc[merchantId][eventTime].push(transaction);
        return acc;
      },
      {} as Record<string, Record<string, listaTransazioneI[]>>
    );

    this.groupedArray = Object.entries(groupedTransactions).map(
      ([merchantId, eventTimes]) => ({
        merchantId,
        eventTimes: Object.entries(eventTimes as Object).map(
          ([eventTime, transactions]) => ({
            eventTime,
            transactions,
            totalAmount: transactions.reduce(
              (sum: any, tx: any) => sum + tx.amountMinor,
              0
            ),
            totalQuantityTransactions: transactions.length,
          })
        ),
      })
    );

    this.showReport = true
    this.cdk.detectChanges();
  }

  refreshPage() {
    this.listaTransazioneService.getList().subscribe((data: any) => {
      this.listaTransazione = data;
      this.cdk.detectChanges();
    })
    this.showReport = false;
    this.ngOnInit();
  }



  ngOnDestroy() {
    clearInterval(this.timer);
  }
}
