import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input() product: any = {};
  constructor(private router: Router) {}

  ngOnInit() {}
  goToProduct(product) {
    this.router.navigate(['/product-details', product._id]);
  }
}
