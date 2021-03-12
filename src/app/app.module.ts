import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
import { getAuthServiceConfigs } from './socialLoginConfig';


import { AddressCardComponent } from './components/layout/elements/address-card/address-card.component';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { HomeComponent } from './components/pages/home/home.component';
import { WishlistComponent } from './components/pages/wishlist/wishlist.component';
import { ProductDetailsComponent } from './components/pages/product-details/product-details.component';
import { AboutUsComponent } from './components/pages/about-us/about-us.component';
import { CartComponent } from './components/pages/cart/cart.component';
import { CheckoutComponent } from './components/pages/checkout/checkout.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { LoginRegisterComponent } from './components/pages/login-register/login-register.component';
import { MyAccountComponent } from './components/pages/my-account/my-account.component';
import { ShopComponent } from './components/pages/shop/shop.component';
import { ShopNoSidebarComponent } from './components/pages/shop-no-sidebar/shop-no-sidebar.component';
import { Page404Component } from './components/pages/page404/page404.component';
import { VentaVisaComponent } from './components/pages/venta-visa/venta-visa.component';
import { VentaEfectivoComponent } from './components/pages/venta-efectivo/venta-efectivo.component';
import { PurchaseDataComponent } from './components/pages/purchase-data/purchase-data.component';


import { TokenInterceptorService } from './services/token-interceptor.service';
import { AuthService } from './services/auth.service';
import { ProductService } from './services/product.service';
import { ClientService } from './services/client.service';
import { OrderService } from './services/order.service';
import { TemporaryCartService } from './services/temporary-cart.service';


import { SlicePipe } from '@angular/common';
import { SliceCartPipe } from './pipes/slice-cart.pipe';
import { MonedaPipe } from './pipes/moneda.pipe';
import { NuevoSolPipe } from './pipes/nuevo-sol.pipe';
import { ReversePipe } from './pipes/reverse.pipe';


import { NumericDirective } from './directives/numeric.directive';


import { AuthGuard } from './guards/auth.guard';


import { NumberPickerModule } from 'ng-number-picker';
import { NgxCarouselModule } from 'ngx-light-carousel';
import { ClickOutsideModule } from 'ng-click-outside';
import { UbigeoService } from './services/ubigeo.service';
import { ProductCardComponent } from './components/layout/elements/product-card/product-card.component';
import { ToastrModule } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';


import {
  HammerGestureConfig,
  HAMMER_GESTURE_CONFIG
} from '@angular/platform-browser';
import * as Hammer from 'hammerjs';

export class CustomHammerConfig extends HammerGestureConfig {
  overrides = {
    pan: {
      direction: Hammer.DIRECTION_ALL
    }
  };
}


import { NgxGalleryModule } from 'ngx-gallery';
import { ShopCategoryComponent } from './components/pages/shop-category/shop-category.component';
import { RecoverPasswordComponent } from './components/pages/recover-password/recover-password.component';
import { AfterPurchaseComponent } from './components/pages/after-purchase/after-purchase.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    WishlistComponent,
    ProductDetailsComponent,
    AboutUsComponent,
    CartComponent,
    CheckoutComponent,
    ContactComponent,
    LoginRegisterComponent,
    MyAccountComponent,
    ShopComponent,
    ShopNoSidebarComponent,
    Page404Component,
    VentaVisaComponent,
    VentaEfectivoComponent,
    PurchaseDataComponent,
    MonedaPipe,
    SliceCartPipe,
    NuevoSolPipe,
    ReversePipe,
    NumericDirective,
    AddressCardComponent,
    ProductCardComponent,
    ShopCategoryComponent,
    RecoverPasswordComponent,
    AfterPurchaseComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    NumberPickerModule,
    ClickOutsideModule,
    FormsModule,
    ReactiveFormsModule,
    NgxCarouselModule,
    SocialLoginModule,
    NgxGalleryModule,
    NgxPaginationModule
  ],
  providers: [
    ProductService,
    ClientService,
    SlicePipe,
    AuthService,
    OrderService,
    TemporaryCartService,
    UbigeoService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    },
    { provide: HAMMER_GESTURE_CONFIG, useClass: CustomHammerConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
