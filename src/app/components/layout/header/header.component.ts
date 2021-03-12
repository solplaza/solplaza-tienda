import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { AuthService } from 'src/app/services/auth.service';
import { TemporaryCartService } from 'src/app/services/temporary-cart.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  client: any;
  subtotalCart: number = 0.0;
  quantityItemsInCart: number = 0;
  temporaryCart = [];

  sidebar = false;
  flagSidebar = 'cerrado';
  carrito = true;
  carritoMobile = true;

  constructor(
    private clientService: ClientService,
    private authService: AuthService,
    private temporaryCartService: TemporaryCartService,
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.clientService.client$.subscribe(
      res => {
        this.client = res;
        if (this.client) {
          this.temporaryCartService.drop();
        }
        this.calculateSubtotal();
        this.calculateQuatityItemsInCart();
      },
      err => {
        console.log('ocurrio un error');
        console.log(err);
      }
    );

    this.temporaryCartService.temporaryCart$.subscribe(
      res => {
        this.temporaryCart = res;
        this.calculateSubtotal();
        this.calculateQuatityItemsInCart();
      },
      err => {
        console.log('error', err);
      }
    );
  }

  calculateSubtotal() {
    if (this.authService.isLoggedIn()) {
      if (this.client) {
        let sub = 0.0;
        for (const itemCart of this.client.cart) {
          sub = sub + itemCart.quantity * itemCart.product.price;
        }
        this.subtotalCart = sub;
      } else {

        this.subtotalCart = 0.0;
      }
    } else {
      let sub = 0.0;
      this.temporaryCart.forEach(e => {
        sub = sub + e.quantity * e.product.price;
      });
      this.subtotalCart = sub;
    }
  }
  calculateQuatityItemsInCart() {
    if (this.authService.isLoggedIn()) {
      if (this.client) {
        let i = 0;
        for (const itemCart of this.client.cart) {
          i++;
        }
        this.quantityItemsInCart = i;
      } else {
        this.quantityItemsInCart = 0;
      }
    } else {
      let i = 0;
      this.temporaryCart.forEach(e => {
        i++;
      });
      this.quantityItemsInCart = i;
    }
  }

  deleteProductFromCart(itemId: string) {
    if (this.authService.isLoggedIn()) {
      this.clientService
        .deleteProductFromCart(this.client._id, itemId)
        .subscribe(
          res => {
            this.clientService.refreshClientInfo();
          },
          err => {
            console.log(err);
          }
        );
    } else {
      this.temporaryCartService.deleteProduct(itemId);
      this.clientService.refreshClientInfo();
    }
  }

  mostrarCarrito() {
    if (this.carrito) {
      const elemento = document.getElementById('carrito');
      elemento.className += ' show';
      this.carrito = false;
    } else {
      const elemento = document.getElementById('carrito');
      elemento.className = 'shopping-cart-content';
      this.carrito = true;
    }
  }

  mostrarCarritoMobile() {
    if (this.carritoMobile) {
      const elemento = document.getElementById('carritoMobile');
      elemento.className += ' show';
      this.carritoMobile = false;
    } else {
      const elemento = document.getElementById('carritoMobile');
      elemento.className = 'shopping-cart-content';
      this.carritoMobile = true;
    }
  }

  onClickOutside(e?: Event) {
    const elemento = document.getElementById('carrito');
    elemento.className = 'shopping-cart-content';
    this.carrito = true;
  }
  onClickOutsideCarritoMobile(e?: Event) {
    const elemento = document.getElementById('carritoMobile');
    elemento.className = 'shopping-cart-content';
    this.carritoMobile = true;
  }

  onClickOutsideMovilSidebar($e) {
    this.sidebar = false;
  }
  showSidebar() {
    console.log('show sidebar');
    this.sidebar = true;
    this.flagSidebar = 'true';
  }
  closeSidebar() {
    this.sidebar = false;
  }

  search(inputSearch: HTMLInputElement) {
    console.log(inputSearch.value.trim());
    if (inputSearch.value.trim() == '') {
      this.toastr.warning('ingrese un termino por favor', 'error en busqueda');
      inputSearch.placeholder = 'ingrese un termino por favor';
      inputSearch.focus();
    } else if (inputSearch.value.trim().length <= 3) {
      this.toastr.warning(
        'ingrese mas de tres letras por favor',
        'error en busqueda'
      );
      inputSearch.focus();
    } else {
      this.productService.getBySearch(inputSearch.value.trim());
      this.router.navigate(['/shop'], {
        queryParams: { searchTerm: inputSearch.value.trim() }
      });
    }
    this.closeSidebar();
  }

  searchMobile(inputSearch: HTMLInputElement) {
    console.log(inputSearch.value.trim());
    if (inputSearch.value.trim() == '') {
      this.toastr.warning('ingrese un termino por favor', 'error en busqueda');
      inputSearch.placeholder = 'ingrese un termino por favor';
      inputSearch.focus();
    } else if (inputSearch.value.trim().length <= 3) {
      this.toastr.warning(
        'ingrese mas de tres letras por favor',
        'error en busqueda'
      );
      inputSearch.focus();
    } else {
      this.productService.getBySearch(inputSearch.value.trim());
      this.router.navigate(['/shop'], {
        queryParams: { searchTerm: inputSearch.value.trim() }
      });
    }
    this.closeSidebar();
  }

  goToSubcategory(category: string) {
    this.productService.getBySubcategory(category);
    this.router.navigate(['/shop-category'], {
      queryParams: { category: category }
    });
    this.closeSidebar();
  }


  signOut() {
    this.authService.signOut();
    this.router.navigate(['/home']);
  }
}
