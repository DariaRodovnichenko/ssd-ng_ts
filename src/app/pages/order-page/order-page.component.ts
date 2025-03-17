import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Recipe, Restaurant } from '../../models/interfaces';
import { CommonModule } from '@angular/common';
import { CategorySidebarComponent } from '../../components/category-sidebar/category-sidebar.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-order-page',
  standalone: true,
  imports: [CommonModule, CategorySidebarComponent],
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css'],
})
export class OrderPageComponent implements OnInit {
toggleCart() {
throw new Error('Method not implemented.');
}
  restaurantData$!: Observable<Restaurant>;
  selectedCategoryUuid: string | null = null;
  selectedProduct: string | null = null;
  cart: Recipe[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.restaurantData$ = this.orderService.getRestaurantData();
  }

  selectCategory(categoryUuid: string) {
    this.selectedCategoryUuid = categoryUuid;
  }

  toggleDetails(productUuid: string) {
    this.selectedProduct =
      this.selectedProduct === productUuid ? null : productUuid;
  }

  closeDetails(event: Event) {
    event.stopPropagation();
    this.selectedProduct = null;
  }

  addToCart(recipe: Recipe, event: Event) {
    event.stopPropagation();
    this.cart.push(recipe);
  }

  removeFromCart(recipe: Recipe, event: Event) {
    event.stopPropagation();
    this.cart = this.cart.filter((item) => item.uuid !== recipe.uuid);
  }

  getTotalPrice(): number {
    return this.cart.reduce((sum, item) => sum + item.price, 0) / 100;
  }
}

