import { Routes } from '@angular/router';
import { OrderPageComponent } from './pages/order-page/order-page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'order', pathMatch: 'full' },
  { path: 'order', component: OrderPageComponent },
];
