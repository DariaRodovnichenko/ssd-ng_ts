import { OrderService } from './services/order.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  restaurantTitle: string = 'Loading...';

  constructor(private OrderService: OrderService) {}

  ngOnInit() {
    this.OrderService.getRestaurantData().subscribe((data) => {
      this.restaurantTitle = data.title;
    });
  }
}
