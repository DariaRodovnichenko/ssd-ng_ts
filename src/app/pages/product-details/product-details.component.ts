import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { Recipe } from '../../models/interfaces';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product!: Recipe | null;
  productUuid!: string | null;

  constructor(
    private route: ActivatedRoute,
    public orderService: OrderService,
    private router: Router // Inject Router for navigation
  ) {}

  ngOnInit() {
    this.productUuid = this.route.snapshot.paramMap.get('uuid');

    if (this.productUuid !== null) {
      // Ensure it's not null
      this.orderService.getRestaurantData().subscribe((restaurant) => {
        if (restaurant) {
          this.product = this.orderService.getProductByUuid(
            this.productUuid as string
          );
        }
      });
    }
  }

  addToCart() {
    if (this.product) {
      this.orderService.addToCart(this.product);
    }
  }

  navigateToMenu() {
    this.router.navigate(['/order']);
  }
}
