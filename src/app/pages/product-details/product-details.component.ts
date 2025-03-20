import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { Recipe } from '../../models/interfaces';

@Component({
  selector: 'app-product-details',
  standalone: true,
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product!: Recipe | null;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    const productUuid = this.route.snapshot.paramMap.get('uuid');
    if (productUuid) {
      this.product = this.orderService.getProductByUuid(productUuid);
    }
  }

  addToCart() {
    if (this.product) {
      this.orderService.addToCart(this.product);
    }
  }
}
