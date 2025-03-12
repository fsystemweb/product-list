import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MaterialModule } from '../../../../vendor/material.module';
import { ProductsHeadComponent } from '../products-head/products-head.component';
import { Router, ActivatedRoute } from '@angular/router';

// table 1
interface productsData {
  id: number;
  slug: string;
  name: string;
  image: string;
  price: number;
}

const PRODUCT_DATA: productsData[] = [
  {
    id: 1,
    slug: 'robusta',
    name: 'Robusta',
    image: '/assets/images/products/1.jpg',
    price: 100,
  },
  {
    id: 2,
    slug: 'arabica',
    name: 'Arabica',
    image: '/assets/images/products/2.jpg',
    price: 150,
  },
  {
    id: 3,
    slug: 'excelsa',
    name: 'Excelsa',
    image: '/assets/images/products/3.jpg',
    price: 200,
  },
];

@Component({
  selector: 'app-products-table',
  imports: [CommonModule, MaterialModule, ProductsHeadComponent],
  templateUrl: './products-table.component.html',
})
export class ProductsTableComponent {
  private router: Router = inject(Router);
  private route: ActivatedRoute = inject(ActivatedRoute);
  displayedColumns: string[] = ['image', 'name', 'price'];
  dataSource1 = PRODUCT_DATA;

  onRowClick(row: productsData): void {
    this.router.navigate(['./productView', row.slug], { relativeTo: this.route });
  }

  getImage(row: productsData): string {
    const productsImagesPath = '/assets/images/products/';
    return productsImagesPath + 'coffee-1.jpg';

    //return productsImagesPath + row.image;
  }
}
