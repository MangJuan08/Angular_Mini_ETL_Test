import { listaTransazioneI } from "./list-transactions";

export interface EventTimeGroup {
  eventTime: string;
  totalAmount: number;
  totalQuantityTransactions: number;
  transactions: listaTransazioneI[];
}