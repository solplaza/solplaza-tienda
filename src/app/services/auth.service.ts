import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ClientService } from './client.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly URL_API_CLIENT_AUTH = `${environment.urlAPI}/auth`;

  constructor(private http: HttpClient, private clientService: ClientService) {}

  signIn(client) {

    return this.http.post(this.URL_API_CLIENT_AUTH + '/client/signin', client);
  }

  setToken(token): void {
    localStorage.setItem('token', token);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  signOut() {
    localStorage.removeItem('token');
    this.clientService.updateClient('');
  }

  getToken() {
    return localStorage.getItem('token');
  }


}
