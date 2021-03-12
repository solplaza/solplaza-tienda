import { Component, OnInit, OnDestroy } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OrderService } from 'src/app/services/order.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UbigeoService } from 'src/app/services/ubigeo.service';
import { ToastrService } from 'ngx-toastr';
import { CulqiService } from 'src/app/services/culqi.service';
import { Subscription } from 'rxjs';

declare let Culqi: any;

@Component({
  selector: 'app-purchase-data',
  templateUrl: './purchase-data.component.html',
  styleUrls: ['./purchase-data.component.scss'],
})
export class PurchaseDataComponent implements OnInit, OnDestroy {
  client: any;
  clientSubscription: Subscription;
  total: number = 0;

  paymentMethodsForm: FormGroup;
  newAddressForm: FormGroup;
  shippingAddressForm: FormGroup;

  newAddressSelectedFlag = false;
  defaultAddress: any;

  departments = [];
  provinces = [];
  districts = [];

  purchaseState = 'Pago pendiente';

  constructor(
    private clientService: ClientService,
    private orderService: OrderService,
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    public ubigeoService: UbigeoService,
    private culqi: CulqiService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    console.log('nginit de purchase component');
    this.departments = this.ubigeoService.departments;
    this.culqi.initCulqi();
    if (this.authService.isLoggedIn() === true) {
      console.log('hay cliente');

      this.clientSubscription = this.clientService.client$.subscribe(
        (res) => {
          console.log(res);
          this.client = res;
          if (this.client) {
            this.defaultAddress = this.clientService.getDefaultAddress(
              this.client.addresses
            );
            if (this.defaultAddress._id == 'newAddress') {
              this.newAddressSelectedFlag = true;
            } else {
              this.newAddressSelectedFlag = false;
            }

            this.calculateTotal();
            if (this.client.cart.length == 0) {
              console.log('0 items en el carrito del cliente');
              this.router.navigate(['/home']);
            }
            this.initForms();
          }
        },

        (err) => {
          console.log(err);
        }
      );
    } else {
      this.router.navigate(['/login-register'], {
        queryParams: { toCheckout: true },
      });
    }
  }

  ngOnDestroy(): void {
    if (this.clientSubscription) {
      this.clientSubscription.unsubscribe();
    }
  }

  calculateTotal() {
    let cantidad: number = 0;
    for (const i in this.client.cart) {
      cantidad +=
        this.client.cart[i].product.price * this.client.cart[i].quantity;
    }
    this.total = cantidad;
  }

  selectChanged(value) {
    if (value == 'newAddress') {
      this.newAddressSelectedFlag = true;
    } else {
      this.newAddressSelectedFlag = false;
    }
  }

  makePurchase(
    newAddressForm: FormGroup,
    paymentMethodsForm: FormGroup,
    shippingAddressForm: FormGroup,
    btnMakePurchase: HTMLButtonElement,
    proccesingPurchaseSpinner: HTMLElement
  ) {
    const { shippingAddressSelected } = shippingAddressForm.value;

    if (paymentMethodsForm.value.paymentMethod == 'Transferencia bancaria') {
      btnMakePurchase.classList.add('d-none');
      proccesingPurchaseSpinner.classList.remove('d-none');
      proccesingPurchaseSpinner.classList.add('d-flex');

      if (shippingAddressSelected == 'newAddress') {
        const { department, province, district } = this.ubigeoService.getUbigeo(
          newAddressForm.value.department,
          newAddressForm.value.province,
          newAddressForm.value.district
        );

        newAddressForm.value.department = department;
        newAddressForm.value.province = province;
        newAddressForm.value.district = district;

        this.clientService
          .createAddress(newAddressForm.value, this.client.addresses.length)
          .subscribe(
            (res: any) => {
              let newOrder = {
                destinationAddress: res.result.addresses[0],
                paymentMethod: paymentMethodsForm.value.paymentMethod,
                products: this.client.cart,
                totalPrice: this.total,
                state: this.purchaseState,
              };
              this.orderService.createWireTransfer(newOrder).subscribe(
                (order: any) => {
                  this.clientService.addOrder(order._id).subscribe(
                    (res) => {
                      this.orderService.sendEmail(order, this.client).subscribe(
                        (res) => {
                          this.toastr.success(
                            'verifica el estado de tu orden en tu panel de control',
                            'Orden exitosa'
                          );
                          this.router.navigate(['/after-purchase'], {
                            queryParams: { paymentMethod: 'wireTransfer' },
                          });
                        },
                        (error) => {
                          console.log(error);
                          btnMakePurchase.style.display = 'block';
                          proccesingPurchaseSpinner.style.display = 'none';
                        }
                      );
                    },

                    (err) => {
                      console.log(err);
                    }
                  );
                },
                (err) => {
                  console.log(err);
                }
              );
            },
            (err) => {
              console.log(err);
            }
          );
      } else {
        let destinationAddress;
        this.client.addresses.forEach((e) => {
          if (e._id == shippingAddressSelected) {
            destinationAddress = e;
          }
        });

        let newOrder = {
          destinationAddress,
          paymentMethod: paymentMethodsForm.value.paymentMethod,
          products: this.client.cart,
          totalPrice: this.total,
          state: this.purchaseState,
        };

        this.orderService.createWireTransfer(newOrder).subscribe(
          (order: any) => {
            this.clientService.addOrder(order._id).subscribe(
              (res) => {
                this.orderService.sendEmail(order, this.client).subscribe(
                  (res) => {
                    this.toastr.success(
                      'verifica el estado de tu orden en tu panel de control',
                      'Orden exitosa'
                    );
                    console.log('exitoso envio de mails');
                    this.router.navigate(['/after-purchase'], {
                      queryParams: { paymentMethod: 'wireTransfer' },
                    });
                  },
                  (error) => {
                    console.log(error);
                    btnMakePurchase.classList.remove('d-none');
                    btnMakePurchase.classList.remove('d-flex');
                    proccesingPurchaseSpinner.classList.remove('d-flex');
                    proccesingPurchaseSpinner.classList.add('d-none');
                  }
                );
              },

              (err) => {
                console.log(err);
              }
            );
          },
          (err) => {
            console.log(err);
          }
        );
      }
    } else if (
      paymentMethodsForm.value.paymentMethod == 'Tarjeta de credito o debito'
    ) {
      if (shippingAddressSelected == 'newAddress') {
        const { department, province, district } = this.ubigeoService.getUbigeo(
          newAddressForm.value.department,
          newAddressForm.value.province,
          newAddressForm.value.district
        );

        newAddressForm.value.department = department;
        newAddressForm.value.province = province;
        newAddressForm.value.district = district;

        this.clientService
          .createAddress(newAddressForm.value, this.client.addresses.length)
          .subscribe(
            (res: any) => {
              let newOrder = {
                destinationAddress: res.result.addresses[0],
                paymentMethod: paymentMethodsForm.value.paymentMethod,
                products: this.client.cart,
                totalPrice: this.total,
                state: this.purchaseState,
              };
              try {
                this.culqi.payorder(
                  this.total,
                  newOrder,
                  this.client,
                  btnMakePurchase,
                  proccesingPurchaseSpinner
                );
              } catch (error) {
                console.log(error);
                this.toastr.error(
                  error,
                  'Hubo un error al momento de procesar la compra'
                );
                btnMakePurchase.style.display = 'block';
                proccesingPurchaseSpinner.style.display = 'none';
              }
            },
            (err) => {
              console.log('error creando la direccion');
              console.log(err);
              this.clientService.refreshClientInfo();
              btnMakePurchase.classList.remove('d-none');
              btnMakePurchase.classList.remove('d-flex');
              proccesingPurchaseSpinner.classList.remove('d-flex');
              proccesingPurchaseSpinner.classList.add('d-none');
            }
          );
      } else {
        let destinationAddress;

        this.client.addresses.forEach((e) => {
          if (e._id == shippingAddressSelected) {
            destinationAddress = e;
          }
        });

        let newOrder = {
          destinationAddress,
          paymentMethod: paymentMethodsForm.value.paymentMethod,
          products: this.client.cart,
          totalPrice: this.total,
          state: this.purchaseState,
        };

        try {
          this.culqi.payorder(
            this.total,
            newOrder,
            this.client,
            btnMakePurchase,
            proccesingPurchaseSpinner
          );
        } catch (error) {
          console.log(error);
          this.toastr.error(
            error,
            'Hubo un error al momento de procesar la compra, por favor intenta mas tarde'
          );
          btnMakePurchase.classList.remove('d-none');
          btnMakePurchase.classList.remove('d-flex');
          proccesingPurchaseSpinner.classList.remove('d-flex');
          proccesingPurchaseSpinner.classList.add('d-none');
        }
      }
    }
  }

  changeDepartment(idDepartment) {
    this.districts = [];
    this.provinces = [];
    this.provinces = this.ubigeoService.getProvincesById(idDepartment);
    this.newAddressForm.value.province = '';
    this.newAddressForm.value.district = '';
    this.newAddressForm.reset(this.newAddressForm.value);
  }
  changeProvince(idProvince) {
    this.districts = [];
    this.districts = this.ubigeoService.getDistrictsById(idProvince);
    this.newAddressForm.value.district = '';
    this.newAddressForm.reset(this.newAddressForm.value);
  }

  initForms() {
    this.newAddressForm = this.fb.group({
      firstName: [this.client.firstName, [Validators.required]],
      lastName: [this.client.lastName, [Validators.required]],
      DNI: ['', [Validators.required, Validators.minLength(8)]],
      cellPhone: ['', [Validators.required, Validators.minLength(9)]],
      district: ['', Validators.required],
      province: ['', [Validators.required]],
      department: ['', [Validators.required]],
      shippingAddress: ['', [Validators.required]],
    });
    this.paymentMethodsForm = this.fb.group({
      paymentMethod: ['Transferencia bancaria'],
    });
    this.shippingAddressForm = this.fb.group({
      shippingAddressSelected: [this.defaultAddress._id],
    });
  }
}
