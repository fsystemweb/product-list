import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MaterialModule } from '../../../../vendor/material.module';

// table 1
interface productsData {
  id: number;
  slug: string;
  name: string;
  products: number;
}

const PRODUCT_DATA: productsData[] = [
  {
    id: 1,
    slug: 'robusta',
    name: 'Robusta',
    products: 2,
  },
  {
    id: 2,
    slug: 'arabica',
    name: 'Arabica',
    products: 3,
  },
  {
    id: 3,
    slug: 'excelsa',
    name: 'Excelsa',
    products: 4,
  },
];

@Component({
  selector: 'app-categories-table',
  imports: [CommonModule, MaterialModule],
  templateUrl: './categories-table.component.html',
})
export class CategoriesTableComponent {
  // table 1
  displayedColumns1: string[] = ['name', 'products'];
  dataSource1 = PRODUCT_DATA;
}
