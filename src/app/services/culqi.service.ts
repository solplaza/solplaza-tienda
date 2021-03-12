import { Injectable } from '@angular/core';
import { ScriptsService } from './scripts.service';
import { OrderService } from './order.service';
import { ClientService } from './client.service';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from './product.service';
import { Router } from '@angular/router';

export declare let Culqi;

@Injectable({
  providedIn: 'root'
})
export class CulqiService {
  token: string;
  order;
  client;

  btnMakePurchase: HTMLButtonElement;
  spinnerPurchase: HTMLElement;

  constructor(
    private scriptService: ScriptsService,
    private orderService: OrderService,
    private clientService: ClientService,
    private toastr: ToastrService,
    private productService: ProductService,
    private router: Router
  ) {
    document.addEventListener('payment_event', (event: any) => {
      this.btnMakePurchase.classList.add('d-none');
      this.spinnerPurchase.classList.remove('d-none');
      this.spinnerPurchase.classList.add('d-flex');
      this.token = event.detail;
      this.order.culqiToken = this.token;
      this.orderService.createCreditCard(this.order).subscribe(

        (newOrder: any) => {
          console.log(newOrder);
          this.toastr.success(
            newOrder.paymentInfo.outcome.user_message,
            'exitoso'
          );
          this.clientService.addOrder(newOrder.result._id).subscribe(

            res => {
              console.log(this.order);
              this.productService
                .decreaseQuantity(this.order.products)
                .subscribe(
                  res => {
                    this.orderService
                      .sendEmail(newOrder, this.client)
                      .subscribe(
                        res => {
                          this.router.navigate(['/after-purchase'], {
                            queryParams: { paymentMethod: 'culqi' }
                          });
                        },
                        error => {
                          this.toastr.error(
                            error.error.message,
                            'Tu compra fue realizada pero'
                          );
                          this.router.navigate(['/after-purchase'], {
                            queryParams: { paymentMethod: 'culqi' }
                          });
                          this.btnMakePurchase.classList.remove('d-none');
                          this.btnMakePurchase.classList.remove('d-flex');
                          this.spinnerPurchase.classList.remove('d-flex');
                          this.spinnerPurchase.classList.add('d-none');
                        }
                      );
                  },
                  error => {
                    console.log(error);
                    this.toastr.error(
                      'ocurrio un error al momento de reducir el stock de los productos'
                    );
                    this.btnMakePurchase.classList.remove('d-none');
                    this.btnMakePurchase.classList.remove('d-flex');
                    this.spinnerPurchase.classList.remove('d-flex');
                    this.spinnerPurchase.classList.add('d-none');
                  }
                );
            },

            err => {
              console.log('error al añadir orden');
              console.log(err);

            }
          );
        },
        err => {
          console.log('error al crear orden con tarjeta de credito');
          console.log(err);
          this.toastr.error(err.error.body.user_message);
          this.clientService.refreshClientInfo();
          this.btnMakePurchase.classList.remove('d-none');
          this.btnMakePurchase.classList.remove('d-flex');
          this.spinnerPurchase.classList.remove('d-flex');
          this.spinnerPurchase.classList.add('d-none');
        }
      );
    });
    document.addEventListener('payment_event_error', (event: any) => {
      console.log(event.detail);
      this.toastr.error(event.detail.user_message);
    });
  }

  initCulqi() {
    this.scriptService
      .load('Culqi')
      .then(() => {
        Culqi.publicKey = 'pk_test_JD9tfGxAsoEmiReS';
      })
      .catch(e => {
        console.log(e);
        this.toastr.error(
          e,
          'hubo un error al cargar la pasarela de pagos por favor intente en unos minutos'
        );
      });
  }

  payorder(amount: number, order, client, btnMakePurchase, spinnerPurchase) {
    this.client = client;
    this.order = order;
    this.btnMakePurchase = btnMakePurchase;
    this.spinnerPurchase = spinnerPurchase;
    Culqi.settings({
      title: `Sol Plaza`,
      currency: 'PEN',
      description: 'Transferencia asegurada por Culqi',
      amount: amount * 100
    });

    Culqi.options({
      lang: 'es',
      modal: 'true',
      installments: false,
      style: {
        logo:
          'https://www.iconpacks.net/icons/2/free-store-icon-2017-thumb.png',
        maincolor: '#BF2FFB',
        buttontext: '#ffffff',
        maintext: '#4A4A4A',
        desctext: '#4A4A4A'
      }
    });
    Culqi.open();
  }

  open() {
    Culqi.open();
  }
}
