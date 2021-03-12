import { Component, OnInit, OnDestroy } from '@angular/core';
import { FakeDbService } from 'src/app/services/fake-db.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit, OnDestroy {
  productsFound = [];
  searchTerm = '';
  constructor(
    public fakeDB: FakeDbService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    console.log('nginit de shop component');

    this.productService.getBySearch(
      this.route.snapshot.queryParams['searchTerm']
    );

    this.productService.searchResults$.subscribe(
      res => {
        if (res) {
          this.productsFound = res;
          this.searchTerm = this.route.snapshot.queryParams['searchTerm'];
        }
      },
      error => console.log(error)
    );








  }

  ngOnDestroy(): void {
    console.log('ondestroy de shop');
  }

  goToProduct(idProduct: string) {
    this.router.navigate(['/product-details', idProduct]);
  }
}
