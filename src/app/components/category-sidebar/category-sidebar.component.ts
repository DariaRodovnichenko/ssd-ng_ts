import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Category } from '../../models/interfaces';

@Component({
  selector: 'app-category-sidebar',
  standalone: true,
  templateUrl: './category-sidebar.component.html',
  styleUrls: ['./category-sidebar.component.css'],
})
export class CategorySidebarComponent {
  @Input() categories: Category[] | null = [];
  @Output() categorySelected = new EventEmitter<string>();

  selectCategory(categoryUuid: string) {
    this.categorySelected.emit(categoryUuid);
  }
}
