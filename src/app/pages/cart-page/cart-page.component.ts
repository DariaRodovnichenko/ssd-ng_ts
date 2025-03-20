import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService, CartItem } from '../../services/order.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent {
  orderType: 'here' | 'toGo' | null = null;
  tableNumber: number | null = null;
  cart$: Observable<CartItem[]>;

  constructor(private orderService: OrderService, private router: Router) {
    this.cart$ = this.orderService.cart$; // Ensures cart$ is properly used as an observable
  }

  getTotalPrice(): number {
    return this.orderService.getTotalPrice();
  }

  removeFromCart(recipe: CartItem['recipe']) {
    this.orderService.removeFromCart(recipe);
  }

  addToCart(recipe: CartItem['recipe']) {
    this.orderService.addToCart(recipe);
  }

  setOrderType(type: 'here' | 'toGo') {
    this.orderType = type;
    if (type === 'toGo') {
      this.tableNumber = null;
    }
  }

  canProceedToPayment(): boolean {
    return (
      this.orderType === 'toGo' ||
      (this.orderType === 'here' && this.tableNumber !== null)
    );
  }

  proceedToPayment() {
    if (!this.canProceedToPayment()) {
      alert(
        "Please select 'Here' or 'To Go' and provide a table number if dining in."
      );
      return;
    }

    console.log('Proceeding to payment with order:', {
      cart: this.cart$,
      orderType: this.orderType,
      tableNumber: this.tableNumber,
    });

    alert('Order placed successfully! Redirecting to payment...');
    this.orderService.clearCart();
    this.router.navigate(['/']);
  }
}
