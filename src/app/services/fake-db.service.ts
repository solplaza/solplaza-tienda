import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FakeDbService {
  productos: any[] = [
    {
      nombre: 'Titulo prueba',
      imagen: 'assets/images/product/pro-hm5-1N.jpg',
      Descripcion: 'este es una descripcion de prueba',
      precio: 'S/. 210.00'
    },
    {
      nombre: 'Titulo prueba',
      imagen: 'assets/images/product/pro-hm5-1N.jpg',
      Descripcion: 'este es una descripcion de prueba',
      precio: 'S/. 210.00'
    },
    {
      nombre: 'Titulo prueba',
      imagen: 'assets/images/product/pro-hm5-1N.jpg',
      Descripcion: 'este es una descripcion de prueba',
      precio: 'S/. 210.00'
    },
    {
      nombre: 'Titulo prueba',
      imagen: 'assets/images/product/pro-hm5-1N.jpg',
      Descripcion: 'este es una descripcion de prueba',
      precio: 'S/. 210.00'
    },
    {
      nombre: 'Titulo prueba',
      imagen: 'assets/images/product/pro-hm5-1N.jpg',
      Descripcion: 'este es una descripcion de prueba',
      precio: 'S/. 210.00'
    },
    {
      nombre: 'Titulo prueba',
      imagen: 'assets/images/product/pro-hm5-1N.jpg',
      Descripcion: 'este es una descripcion de prueba',
      precio: 'S/. 210.00'
    },
    {
      nombre: 'Titulo prueba',
      imagen: 'assets/images/product/pro-hm5-1N.jpg',
      Descripcion: 'este es una descripcion de prueba',
      precio: 'S/. 210.00'
    },
    {
      nombre: 'Titulo prueba',
      imagen: 'assets/images/product/pro-hm5-1N.jpg',
      Descripcion: 'este es una descripcion de prueba',
      precio: 'S/. 210.00'
    }
  ];

  productsShop: any[] = [
    {
      tipo: 'laptop',
      nombre: 'Acer A515-52g',
      precio: 'S/. 2599.00',
      descuento: '-30%',
      img: 'assets/images/product/producto1N.jpg'
    },
    {
      tipo: 'laptop',
      nombre: 'Acer A515-52g',
      precio: 'S/. 2599.00',
      descuento: '-30%',
      img: 'assets/images/shopimage.jpg'
    },
    {
      tipo: 'laptop',
      nombre: 'Acer A515-52g',
      precio: 'S/. 2599.00',
      descuento: '-30%',
      img: 'assets/images/shopimage.jpg'
    },
    {
      tipo: 'laptop',
      nombre: 'Acer A515-52g',
      precio: 'S/. 2599.00',
      descuento: '-30%',
      img: 'assets/images/shopimage.jpg'
    },
    {
      tipo: 'laptop',
      nombre: 'Acer A515-52g',
      precio: 'S/. 2599.00',
      descuento: '-30%',
      img: 'assets/images/shopimage.jpg'
    },
    {
      tipo: 'laptop',
      nombre: 'Acer A515-52g',
      precio: 'S/. 2599.00',
      descuento: '-30%',
      img: 'assets/images/shopimage.jpg'
    },
    {
      tipo: 'laptop',
      nombre: 'Acer A515-52g',
      precio: 'S/. 2599.00',
      descuento: '-30%',
      img: 'assets/images/shopimage.jpg'
    },
    {
      tipo: 'laptop',
      nombre: 'Acer A515-52g',
      precio: 'S/. 2599.00',
      descuento: '-30%',
      img: 'assets/images/shopimage.jpg'
    },
    {
      tipo: 'laptop',
      nombre: 'Acer A515-52g',
      precio: 'S/. 2599.00',
      descuento: '-30%',
      img: 'assets/images/shopimage.jpg'
    },
    {
      tipo: 'laptop',
      nombre: 'Acer A515-52g',
      precio: 'S/. 2599.00',
      descuento: '-30%',
      img: 'assets/images/shopimage.jpg'
    },
    {
      tipo: 'laptop',
      nombre: 'Acer A515-52g',
      precio: 'S/. 2599.00',
      descuento: '-30%',
      img: 'assets/images/shopimage.jpg'
    },
    {
      tipo: 'laptop',
      nombre: 'Acer A515-52g',
      precio: 'S/. 2599.00',
      descuento: '-30%',
      img: 'assets/images/shopimage.jpg'
    },
    {
      tipo: 'laptop',
      nombre: 'Acer A515-52g',
      precio: 'S/. 2599.00',
      descuento: '-30%',
      img: 'assets/images/shopimage.jpg'
    },
    {
      tipo: 'laptop',
      nombre: 'Acer A515-52g',
      precio: 'S/. 2599.00',
      descuento: '-30%',
      img: 'assets/images/shopimage.jpg'
    },
    {
      tipo: 'laptop',
      nombre: 'Acer A515-52g',
      precio: 'S/. 2599.00',
      descuento: '-30%',
      img: 'assets/images/shopimage.jpg'
    }
  ];

  wishListProducts: any[] = [
    {
      imagen: 'assets/images/cart/cart-3N.jpg',
      nombre: 'Laptop',
      precioUnit: 'S/. 2,599.00',
      cantidad: '1',
      subtotal: 'S/. 2,599.00'
    },
    {
      imagen: 'assets/images/cart/cart-3N.jpg',
      nombre: 'Laptop',
      precioUnit: 'S/. 2,599.00',
      cantidad: '1',
      subtotal: 'S/. 2,599.00'
    },
    {
      imagen: 'assets/images/cart/cart-3N.jpg',
      nombre: 'Laptop',
      precioUnit: 'S/. 2,599.00',
      cantidad: '1',
      subtotal: 'S/. 2,599.00'
    }
  ];

  cartProducts: any[] = [
    {
      img: 'assets/images/product/producto1N82.jpg',
      nombre: 'Laptop Acer',
      precio: 'S/. 260.00',
      subtotal: 'S/. 110.00'
    },
    {
      img: 'assets/images/product/producto1N82.jpg',
      nombre: 'Laptop Acer',
      precio: 'S/. 260.00',
      subtotal: 'S/. 110.00'
    },
    {
      img: 'assets/images/product/producto1N82.jpg',
      nombre: 'Laptop Acer',
      precio: 'S/. 260.00',
      subtotal: 'S/. 110.00'
    },
    {
      img: 'assets/images/product/producto1N82.jpg',
      nombre: 'Laptop Acer',
      precio: 'S/. 260.00',
      subtotal: 'S/. 110.00'
    }
  ];

  constructor() {}
}
