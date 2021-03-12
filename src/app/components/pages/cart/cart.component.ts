import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { TemporaryCartService } from 'src/app/services/temporary-cart.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  client: any;
  temporaryCart = [];

  constructor(
    public clientService: ClientService,
    private temporaryCartService: TemporaryCartService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.clientService.client$.subscribe(res => {
      this.client = res;
    });
    this.temporaryCartService.temporaryCart$.subscribe(
      res => {
        this.temporaryCart = res;
      },
      err => {
        console.log('error', err);
      }
    );
  }

  deleteProductFromCart(productCartId) {
    if (this.authService.isLoggedIn()) {
      this.clientService
        .deleteProductFromCart(this.client._id, productCartId)
        .subscribe(res => {
          this.clientService.refreshClientInfo();
        });
    } else {
      this.temporaryCartService.deleteProduct(productCartId);
    }
  }

  updateQuantity() {
    if (this.authService.isLoggedIn()) {
      console.log(this.client.cart);
      this.clientService.updateCartQuantity(this.client.cart).subscribe(
        res => {
          this.clientService.refreshClientInfo();
        },
        err => {
          console.log(err);
        }
      );
    } else {
      this.temporaryCartService.updateQuantity(this.temporaryCart);
    }
  }
}
