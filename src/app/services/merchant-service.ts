import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MerchantListI } from '../model/merchant-list';

@Injectable({
  providedIn: 'root',
})
export class MerchantService {
  http = inject(HttpClient);
  getList() {
      return this.http.get<MerchantListI[]>("http://localhost:3001/merchants");
    }
}
