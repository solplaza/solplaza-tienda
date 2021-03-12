import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products: any[];

  private searchResults = new BehaviorSubject<any>('');
  searchResults$ = this.searchResults.asObservable();

  private categoryResults = new BehaviorSubject<any>('');
  categoryResults$ = this.categoryResults.asObservable();

  readonly URL_API_PRODUCT = `${environment.urlAPI}/products`;

  constructor(public http: HttpClient) {}

  getAll() {
    return this.http.get(this.URL_API_PRODUCT);
  }
  get(id: string) {
    return this.http.get(`${this.URL_API_PRODUCT}/${id}`);
  }

  getBySearch(term: string) {
    this.http
      .get(`${this.URL_API_PRODUCT}/search/${term}`)
      .subscribe((res: any) => {
        this.searchResults.next(res.searchResult);
      });
  }

  getBySubcategory(subcategory: string) {
    this.http
      .get(`${this.URL_API_PRODUCT}/subcategory/${subcategory}`)
      .subscribe(res => {
        this.categoryResults.next(res);
      });
  }

  decreaseQuantity(items: any[]) {
    return this.http.patch(`${this.URL_API_PRODUCT}/decrease-quantity`, items);
  }
}
