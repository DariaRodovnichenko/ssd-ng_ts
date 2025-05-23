import { Routes } from '@angular/router';
import { OrderPageComponent } from './pages/order-page/order-page.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';

export const routes: Routes = [
  { path: '', redirectTo: 'order', pathMatch: 'full' },
  { path: 'order', component: OrderPageComponent },
  { path: 'cart', component: CartPageComponent },
  { path: 'product/:uuid', component: ProductDetailsComponent },
  { path: '**', redirectTo: '' },
];
