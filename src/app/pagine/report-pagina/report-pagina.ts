import { ChangeDetectorRef, Component, inject, Input, signal } from '@angular/core';
import { ListaTransazioneService } from '../../services/lista-transazione-service';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { listaTransazioneI } from '../../model/list-transactions';
import { GroupedTransactions } from '../../model/grouped-transactions';
import { CommonModule } from '@angular/common';
import { ReportTransactionsPerMerchantId } from '../../components/report-transactions-per-merchant-id/report-transactions-per-merchantId';


@Component({
  selector: 'app-mini-etl-report-pagina',
  imports: [MatExpansionModule, MatProgressSpinnerModule, MatIconModule, MatButtonModule, MatListModule, CommonModule, ReportTransactionsPerMerchantId],
  templateUrl: './report-pagina.html',
  styleUrl: './report-pagina.scss',
})
export class ReportPagina {


  readonly panelOpenState = signal(false);
  listaTransazioneService = inject(ListaTransazioneService);
  listaTransazione: any;
  transactions: listaTransazioneI[] = [];
  groupedArray: GroupedTransactions[] = [];
  cdk = inject(ChangeDetectorRef);
  showReport: Boolean;
  groupedTransactions: any;
  timer: any;

  constructor() {
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
    this.showReport = false;
    this.ngOnInit();
  }



  ngOnDestroy() {
    clearInterval(this.timer)
  }
}
