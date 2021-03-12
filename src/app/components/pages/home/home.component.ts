import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  client: any;
  p: number = 1;
  label: any = {
    previousLabel: 'Anterior',
    nextLabel: 'Siguiente'
  };
  config = {
    id: 'custom',
    itemsPerPage: 20,
    currentPage: 1,
  };


  public innerWidth: any;
  products = [
    {
      title: 'RED Widgets',
      url: 'https://maxantony.net',
      regularPrice: '100.00',
      salePrice: '100.00',
      image: `https://res.cloudinary.com/det8h7rxr/image/upload/v1578363020/Promotions/slider-zona-gamer_npufec.jpg`
    },
    {
      title: 'YELLOW Widgets',
      url: 'https://maxantony.net',
      regularPrice: '100.00',
      salePrice: '100.00',
      image: `https://res.cloudinary.com/det8h7rxr/image/upload/v1578363021/Promotions/slider-arma-tu-pc_puzyvl.jpg`
    },
    {
      title: 'Black Widgets',
      url: 'https://maxantony.net',
      regularPrice: '100.00',
      salePrice: '100.00',
      image: `https://res.cloudinary.com/det8h7rxr/image/upload/v1578363024/Promotions/slider-navidad-es-compartir_vm5tgj.jpg`
    }
  ];
  options1 = {
    animation: {
      animationClass: 'transition',
      animationTime: 200
    },
    swipe: {
      swipeable: true,
      swipeVelocity: 1
    },
    drag: {
      draggable: true,
      dragMany: true
    },
    infinite: true,
    autoplay: {
      enabled: true,
      direction: 'right',
      delay: 5000,
      stopOnHover: true,
      speed: 6000
    },
    breakpoints: [
      {
        width: 768,
        number: 1
      },
      {
        width: 991,
        number: 1
      },
      {
        width: 9999,
        number: 1
      }
    ]
  };


  constructor(
    public productService: ProductService,
    public route: Router,
    public clientService: ClientService
  ) {}

  ngOnInit() {
    console.log('nginit de home component');
    this.getProducts();
    this.clientService.client$.subscribe(
      res => {
        this.client = res;
      },
      err => {
        console.log(err);
      }
    );
  }
  onPageChange(event){
    console.log(event);
    this.config.currentPage = event;
  }
  goToProduct(product) {
    this.route.navigate(['/product-details', product._id]);
  }

  getProducts() {
    this.productService.getAll().subscribe(res => {
      this.productService.products = res as any[];
    });
  }

  ngon;
  ngOnDestroy(): void {
    console.log('home destroyed');


  }
}
