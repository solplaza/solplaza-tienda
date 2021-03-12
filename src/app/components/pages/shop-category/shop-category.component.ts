import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-shop-category',
  templateUrl: './shop-category.component.html',
  styleUrls: ['./shop-category.component.scss']
})
export class ShopCategoryComponent implements OnInit {
  selectedCategory;
  productsFound = [];
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit() {
    this.productService.getBySubcategory(
      this.route.snapshot.queryParams['category']
    );

    this.productService.categoryResults$.subscribe(
      res => {
        if (res) {
          this.productsFound = res;
          this.selectedCategory = this.route.snapshot.queryParams['category'];
        } else {
        }
      },
      err => console.log(err)
    );
  }

  goToProduct(idProduct: string) {
    this.router.navigate(['/product-details', idProduct]);
  }
}
