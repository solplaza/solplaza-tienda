import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TemporaryCartService {
  private temporaryCart = new BehaviorSubject<any>([]);
  temporaryCart$ = this.temporaryCart.asObservable();

  keyTemporaryCart = 'temporaryCart';

  constructor() {}

  load() {
    if (localStorage.getItem(this.keyTemporaryCart)) {
      const tempCart = JSON.parse(localStorage.getItem(this.keyTemporaryCart));
      this.temporaryCart.next(tempCart);
    }
  }

  addProduct(product: any, quantity: number) {
    if (localStorage.getItem(this.keyTemporaryCart)) {
      let tempCart = [];
      let isProductInsideCart = false;
      tempCart = JSON.parse(localStorage.getItem(this.keyTemporaryCart));
      tempCart.forEach(e => {
        if (e.product._id === product._id) {
          isProductInsideCart = true;
        }
      });
      if (isProductInsideCart === false) {
        tempCart.push({ product, quantity });
        localStorage.removeItem(this.keyTemporaryCart);
        localStorage.setItem(this.keyTemporaryCart, JSON.stringify(tempCart));
        this.temporaryCart.next(tempCart);
      } else {
        console.log('the product is already in the cart');
      }
    } else {
      const temporaryCart = [{ product, quantity }];
      localStorage.setItem(
        this.keyTemporaryCart,
        JSON.stringify(temporaryCart)
      );
      console.log(temporaryCart);
      this.temporaryCart.next(temporaryCart);
    }
  }

  deleteProduct(idProduct) {
    let tempCart = [];
    tempCart = JSON.parse(localStorage.getItem(this.keyTemporaryCart));
    const index = tempCart.findIndex(o => o.product._id === idProduct);
    tempCart.splice(index, 1);
    localStorage.removeItem(this.keyTemporaryCart);
    localStorage.setItem(this.keyTemporaryCart, JSON.stringify(tempCart));
    console.log(tempCart);
    this.temporaryCart.next(tempCart);
  }

  editProductQuantity(idProduct, newQuantity: number) {}

  drop() {
    localStorage.removeItem(this.keyTemporaryCart);
    this.temporaryCart.next([]);
  }

  filter(temporaryCart) {


    const filtered = [];
    temporaryCart.forEach(e => {
      filtered.push({ product: e.product._id, quantity: e.quantity });
    });
    return filtered;
  }

  updateQuantity(temporaryCart) {
    localStorage.removeItem(this.keyTemporaryCart);
    localStorage.setItem(this.keyTemporaryCart, JSON.stringify(temporaryCart));
    this.temporaryCart.next(temporaryCart);
  }
}
