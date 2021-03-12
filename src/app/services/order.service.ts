import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  readonly URL_API_ORDER = `${environment.urlAPI}/orders`;

  constructor(private http: HttpClient) {}

  createWireTransfer(order: any) {
    console.log(order);
    return this.http.post(`${this.URL_API_ORDER}/wire-transfer`, order);
  }
  createCreditCard(order: any) {
    console.log(order);
    return this.http.post(`${this.URL_API_ORDER}/credit-card`, order);
  }
  sendEmail(order, client) {
    const body = { order, client };
    return this.http.post(`${this.URL_API_ORDER}/send-email`, body);
  }
}
