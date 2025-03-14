import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MaterialModule } from '../../../../vendor/material.module';
import { ProductsHeadComponent } from '../products-head/products-head.component';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '../../../../models/product';

@Component({
  selector: 'app-products-table',
  imports: [CommonModule, MaterialModule, ProductsHeadComponent],
  templateUrl: './products-table.component.html',
})
export class ProductsTableComponent {
  private router: Router = inject(Router);
  private route: ActivatedRoute = inject(ActivatedRoute);
  displayedColumns: string[] = ['image', 'name', 'price'];
  dataSource: Product[] = [];

  constructor() {
    this.getResolvedData();
  }

  onRowClick(row: Product): void {
    this.router.navigate(['./productView', row._id], { relativeTo: this.route });
  }

  getImage(row: Product): string {
    const productsImagesPath = '/assets/images/products/';
    return productsImagesPath + row.image;
  }

  private getResolvedData(): void {
    const resolvedData = this.route.snapshot.data['resolvedData'];
    this.dataSource = resolvedData.data.products;
  }
}
