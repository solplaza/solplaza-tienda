import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { ClientService } from 'src/app/services/client.service';
import { AuthService } from 'src/app/services/auth.service';
import { TemporaryCartService } from 'src/app/services/temporary-cart.service';
import {
  NgxGalleryOptions,
  NgxGalleryImage,
  NgxGalleryAnimation,
  NgxGalleryImageSize
} from 'ngx-gallery';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  valueStock = 1;
  maxValueStock: number;
  productId: string;
  product: any;
  client: any;
  isProductInCart: boolean;

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(
    private route: ActivatedRoute,
    public productService: ProductService,
    public clientService: ClientService,
    private authService: AuthService,
    private temporaryCartService: TemporaryCartService
  ) {}

  ngOnInit() {
    this.galleryOptions = [
      {
        width: '100%',
        height: '600px',
        thumbnails: false,
        thumbnailsColumns: 3,
        imageAnimation: NgxGalleryAnimation.Slide,
        imageSize: NgxGalleryImageSize.Contain,
        previewZoom: true
      }
    ];

    this.productId = this.route.snapshot.paramMap.get('id');
    this.productService.get(this.productId).subscribe(
      res => {
        if (res) {
          this.product = res;
          this.galleryImages = [
            {
              small: this.product.imageURL,
              medium: this.product.imageURL,
              big: this.product.imageURL
            }
          ];
          this.maxValueStock = this.product.stock;
          this.clientService.client$.subscribe(
            resClient => {
              this.client = resClient;
              if (this.client) {
                this.verifyProductInCart();
              }
            },
            err => {
              console.log(err);
            }
          );
          this.verifyProductInCart();
        }
      },
      err => console.log(err)
    );

    this.temporaryCartService.temporaryCart$.subscribe(
      res => {
        console.log(res);
        if (this.product) {
          console.log(res);
          this.verifyProductInCart();
        }



      },
      err => {
        console.log('error', err);
      }
    );
  }

  addToWishlist() {

    console.log('add to wshilist event');
  }

  addToCart() {
    if (!this.client) {
      this.temporaryCartService.addProduct(this.product, this.valueStock);
      this.verifyProductInCart();
    } else {
      this.clientService
        .addProductToCart(this.product._id, this.valueStock)
        .subscribe(
          res => {
            this.clientService.refreshClientInfo();
          },
          err => {
            console.log(err);
          }
        );
    }
  }

  verifyProductInCart() {
    if (this.authService.isLoggedIn()) {
      const found = this.client.cart.filter(
        e => e.product._id === this.productId
      );
      if (found.length === 0) {
        this.isProductInCart = false;
      } else {
        this.isProductInCart = true;
      }
    } else {
      console.log('user is not logged in');
      let tempCart = JSON.parse(localStorage.getItem('temporaryCart'));
      if (!tempCart) {
        tempCart = [];
      }
      if (tempCart.length > 0) {
        tempCart.forEach(e => {
          if (e.product._id === this.product._id) {
            this.isProductInCart = true;
          } else {


            this.isProductInCart = false;
          }
        });
      } else {
        this.isProductInCart = false;
      }
    }
  }
}
