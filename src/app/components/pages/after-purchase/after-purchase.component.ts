import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-after-purchase',
  templateUrl: './after-purchase.component.html',
  styleUrls: ['./after-purchase.component.scss']
})
export class AfterPurchaseComponent implements OnInit, OnDestroy {
  paymentMethod;

  constructor(private route: ActivatedRoute, private clientservice: ClientService) {}

  ngOnInit() {
    console.log('nginit de after');
    this.paymentMethod = this.route.snapshot.queryParams['paymentMethod'];
    this.clientservice.refreshClientInfo();
  }

  ngOnDestroy() {
    console.log('destry de after');
  }
}
