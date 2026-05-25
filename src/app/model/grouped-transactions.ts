import { EventTimeGroup } from "./event-timegroup";
import { listaTransazioneI } from "./list-transactions";

export interface GroupedTransactions {
  merchantId: string;
  eventTimes: EventTimeGroup[];
}
