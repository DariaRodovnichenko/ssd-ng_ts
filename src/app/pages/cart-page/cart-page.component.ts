import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../services/order.service';
import { Recipe } from '../../models/interfaces';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

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

  constructor(private orderService: OrderService, private router: Router) {}

  get cart(): { recipe: Recipe; quantity: number }[] {
    return this.orderService.cart;
  }

  getTotalPrice(): number {
    return (
      this.cart.reduce(
        (sum, item) => sum + item.recipe.price * item.quantity,
        0
      ) / 100
    );
  }

  removeFromCart(recipe: Recipe) {
    this.orderService.removeFromCart(recipe);
  }

  addToCart(recipe: Recipe) {
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
      cart: this.cart,
      orderType: this.orderType,
      tableNumber: this.tableNumber,
    });

    alert('Order placed successfully! Redirecting to payment...');
    this.orderService.clearCart();
    // Redirect to home page after order
    this.router.navigate(['/']);
  }
}
