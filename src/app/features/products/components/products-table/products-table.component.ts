import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MaterialModule } from '../../../../vendor/material.module';
import { ProductsHeadComponent } from '../products-head/products-head.component';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '../../../../models/product';
import { ProductImagePipe } from '../../../../pipe/product-image.pipe';

@Component({
  selector: 'app-products-table',
  imports: [CommonModule, MaterialModule, ProductsHeadComponent, ProductImagePipe],
  templateUrl: './products-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
    this.router.navigate(['./product-view', row.slug], { relativeTo: this.route });
  }

  private getResolvedData(): void {
    const resolvedData = this.route.snapshot.data['resolvedData'];
    this.dataSource = resolvedData.data.products;
  }
}
