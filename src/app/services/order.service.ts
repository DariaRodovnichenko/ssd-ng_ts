import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recipe, Restaurant } from '../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  // Fetching restaurant data
  private dataUrl = 'assets/restaurant-data.json';
  // Cart storage
  cart: { recipe: Recipe; quantity: number }[] = [];

  constructor(private http: HttpClient) {}

  // Fetch restaurant data
  getRestaurantData(): Observable<Restaurant> {
    return this.http.get<Restaurant>(this.dataUrl);
  }

  // Add item to cart
  addToCart(recipe: Recipe) {
    const existingItem = this.cart.find(
      (item) => item.recipe.uuid === recipe.uuid
    );
    if (existingItem) {
      // Increase quantity if already in cart
      existingItem.quantity += 1;
    } else {
      this.cart.push({ recipe, quantity: 1 });
    }
  }

  // Remove item from cart
  removeFromCart(recipe: Recipe) {
    const existingItem = this.cart.find(
      (item) => item.recipe.uuid === recipe.uuid
    );
    // Reduce quantity if more than 1
    if (existingItem && existingItem.quantity > 1) {
      existingItem.quantity -= 1;
    } else {
      this.cart = this.cart.filter((item) => item.recipe.uuid !== recipe.uuid);
    }
  }

  // Calculate total price
  getTotalPrice(): number {
    return (
      this.cart.reduce(
        (sum, item) => sum + item.recipe.price * item.quantity,
        0
      ) / 100
    );
  }

  // Clear cart after order completion
  clearCart() {
    this.cart = [];
  }
}
