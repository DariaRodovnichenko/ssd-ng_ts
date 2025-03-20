import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Recipe, Restaurant } from '../models/interfaces';
import { map } from 'rxjs/operators';

export interface CartItem {
  recipe: Recipe;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  // Fetching restaurant data
  private dataUrl = 'assets/restaurant-data.json';

  // Store restaurant data
  private restaurantData$ = new BehaviorSubject<Restaurant | null>(null);

  // Use BehaviorSubject for cart state
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  cart$ = this.cartSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadRestaurantData();
  }

  // Load restaurant data and store it in BehaviorSubject
  private loadRestaurantData() {
    this.http.get<Restaurant>(this.dataUrl).subscribe((data) => {
      this.restaurantData$.next(data);
    });
  }

  // Fetch restaurant data as an observable
  getRestaurantData(): Observable<Restaurant> {
    return this.restaurantData$.asObservable().pipe(
      map((data) => data as Restaurant) // Ensure correct type
    );
  }

  // Fetch product by UUID
  getProductByUuid(uuid: string): Recipe | null {
    const restaurant = this.restaurantData$.getValue();
    if (!restaurant) return null;
    for (const category of restaurant.data) {
      const product = category.recipes.find((recipe) => recipe.uuid === uuid);
      if (product) return product;
    }
    return null;
  }

  // Add item to cart
  addToCart(recipe: Recipe) {
    const cart = this.cartSubject.getValue();
    const existingItem = cart.find((item) => item.recipe.uuid === recipe.uuid);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ recipe, quantity: 1 });
    }
    // Emit updated cart
    this.cartSubject.next([...cart]);
  }

  // Remove item from cart
  removeFromCart(recipe: Recipe) {
    let cart = this.cartSubject.getValue();
    const existingItem = cart.find((item) => item.recipe.uuid === recipe.uuid);

    if (existingItem) {
      if (existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      } else {
        cart = cart.filter((item) => item.recipe.uuid !== recipe.uuid);
      }
      // Emit updated cart
      this.cartSubject.next([...cart]);
    }
  }

  // Calculate total price
  getTotalPrice(): number {
    return (
      this.cartSubject
        .getValue()
        .reduce((sum, item) => sum + item.recipe.price * item.quantity, 0) / 100
    );
  }

  // Clear cart after order completion
  clearCart() {
    this.cartSubject.next([]);
  }
}
