import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Restaurant } from '../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private dataUrl = 'assets/restaurant-data.json';

  constructor(private http: HttpClient) {}

  getRestaurantData(): Observable<Restaurant> {
    return this.http.get<Restaurant>(this.dataUrl);
  }
}
