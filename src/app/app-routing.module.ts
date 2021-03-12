import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { ProductDetailsComponent } from './components/pages/product-details/product-details.component';
import { AboutUsComponent } from './components/pages/about-us/about-us.component';
import { CartComponent } from './components/pages/cart/cart.component';
import { CheckoutComponent } from './components/pages/checkout/checkout.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { LoginRegisterComponent } from './components/pages/login-register/login-register.component';
import { MyAccountComponent } from './components/pages/my-account/my-account.component';
import { ShopComponent } from './components/pages/shop/shop.component';
import { ShopNoSidebarComponent } from './components/pages/shop-no-sidebar/shop-no-sidebar.component';
import { WishlistComponent } from './components/pages/wishlist/wishlist.component';
import { Page404Component } from './components/pages/page404/page404.component';
import { VentaVisaComponent } from './components/pages/venta-visa/venta-visa.component';
import { VentaEfectivoComponent } from './components/pages/venta-efectivo/venta-efectivo.component';
import { PurchaseDataComponent } from './components/pages/purchase-data/purchase-data.component';
import { AuthGuard } from './guards/auth.guard';
import { ShopCategoryComponent } from './components/pages/shop-category/shop-category.component';
import { RecoverPasswordComponent } from './components/pages/recover-password/recover-password.component';
import { AfterPurchaseComponent } from './components/pages/after-purchase/after-purchase.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'product-details/:id', component: ProductDetailsComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'cart', component: CartComponent },
  { path: 'login-register', component: LoginRegisterComponent },
  { path: 'contact', component: ContactComponent },
  {
    path: 'my-account',
    component: MyAccountComponent,
    canActivate: [AuthGuard]
  },
  { path: 'shop-no-sidebar', component: ShopNoSidebarComponent },
  { path: 'shop-category', component: ShopCategoryComponent },
  { path: 'venta-visa', component: VentaVisaComponent },
  { path: 'wishlist', component: WishlistComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'page404', component: Page404Component },
  { path: 'venta-efectivo', component: VentaEfectivoComponent },
  { path: 'purchase-data', component: PurchaseDataComponent },
  { path: 'recover-password', component: RecoverPasswordComponent },
  { path: 'after-purchase', component: AfterPurchaseComponent },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
