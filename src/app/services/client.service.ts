import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  readonly URL_API_CLIENT = `${environment.urlAPI}/clients`;

  cart: [] = [];
  private client = new BehaviorSubject<any>('');
  client$ = this.client.asObservable();

  constructor(public http: HttpClient) {}

  signIn(loginForm) {
    const { email, password } = loginForm;
    const data = { email, password };
    return this.http.post(this.URL_API_CLIENT + '/signin', data);
  }

  googleSignIn(authToken) {
    return this.http.post(this.URL_API_CLIENT + '/signin/google', {
      googleAuthToken: authToken
    });
  }

  facebookSignIn(authToken) {
    return this.http.post(this.URL_API_CLIENT + '/signin/facebook', {
      facebookAuthToken: authToken
    });
  }



  createClient(newClient) {
    return this.http.post(this.URL_API_CLIENT, newClient);
  }

  getClient() {
    return this.http.get(`${this.URL_API_CLIENT}/profile`);
  }

  updateClient(client: any) {
    this.client.next(client);
  }

  refreshClientInfo() {
    this.http.get(this.URL_API_CLIENT + '/profile').subscribe(
      res => {
        console.log(res);
        this.client.next(res);
      },
      err => {
        console.log(err);
        this.client.next('');
      }
    );
  }

  updateAccountDetails(clientId, data) {
    return this.http.put(
      this.URL_API_CLIENT + '/' + clientId + '/account-details',
      data
    );
  }

  resetPassword(currentPassword, newPassword) {
    const data = { currentPassword, newPassword };
    return this.http.put(this.URL_API_CLIENT + '/resetPassword', data);
  }

  recoverPassword(body) {
    console.log(body);
    return this.http.put(`${this.URL_API_CLIENT}/recover-password/hash`, body);
  }

  recoverPassByMail(email) {
    return this.http.put(`${this.URL_API_CLIENT}/recover-password/recover`, {
      email
    });
  }



  addProductToCart(productId: string, productQuantity: number) {
    const body = {
      productId,
      quantity: productQuantity
    };
    return this.http.post(this.URL_API_CLIENT + `/cart`, body);
  }

  deleteProductFromCart(clientId: string, productCartId: string) {
    return this.http.delete(this.URL_API_CLIENT + '/cart/' + productCartId);
  }

  addProductsFromTemporaryCart(filtered) {
    return this.http.post(this.URL_API_CLIENT + `/cart`, {
      temporaryCart: filtered
    });
  }

  updateCartQuantity(cart) {
    return this.http.post(this.URL_API_CLIENT + `/cart`, {
      temporaryCart: cart
    });
  }



  createAddress(address, length) {
    if (length === 0) {
      address.isDefault = true;
    } else {
      address.isDefault = false;
    }
    return this.http.post(this.URL_API_CLIENT + '/address', address);
  }

  deleteAddress(idAddress) {
    return this.http.delete(this.URL_API_CLIENT + '/address/' + idAddress);
  }

  updateAddress(idAddress, address) {
    return this.http.put(
      this.URL_API_CLIENT + '/address/' + idAddress,
      address
    );
  }

  setAddressAsDefault(idAddress) {
    return this.http.put(this.URL_API_CLIENT + '/address/' + idAddress, {
      isDefault: true
    });
  }

  getDefaultAddress(addresses): string {
    let defaultAddress;

    if (addresses.length > 0) {
      addresses.forEach(e => {
        if (e.isDefault) {
          defaultAddress = e;



        }
      });
    } else {
      defaultAddress = {
        _id: 'newAddress'
      };
    }
    return defaultAddress;
  }



  addOrder(idOrder) {
    return this.http.post(this.URL_API_CLIENT + '/order', { idOrder });
  }

}
