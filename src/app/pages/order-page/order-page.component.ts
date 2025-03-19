import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Recipe, Restaurant } from '../../models/interfaces';
import { CommonModule } from '@angular/common';
import { CategorySidebarComponent } from '../../components/category-sidebar/category-sidebar.component';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

export interface CartItem extends Recipe {
  quantity: number;
}

@Component({
  selector: 'app-order-page',
  standalone: true,
  imports: [CommonModule, CategorySidebarComponent, FormsModule, RouterModule],
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css'],
})
export class OrderPageComponent implements OnInit {
  restaurantData$!: Observable<Restaurant>;
  selectedCategoryUuid: string | null = null;
  selectedProduct: string | null = null;
  cart: CartItem[] = [];
  cartOpen = false;
  orderType: 'here' | 'toGo' | null = null;
  tableNumber: number | null = null;

  constructor(public orderService: OrderService) {}

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

  addToCart(recipe: any, event: Event) {
    event.stopPropagation();
    this.orderService.addToCart(recipe);
  }
}
