import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MaterialModule } from '../../../../vendor/material.module';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../../../models/category';

@Component({
  selector: 'app-categories-table',
  imports: [CommonModule, MaterialModule],
  templateUrl: './categories-table.component.html',
})
export class CategoriesTableComponent {
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);

  displayedColumns: string[] = ['name', 'products'];
  dataSource: Category[] = [];

  loading = false;

  constructor() {
    this.getCategory();
  }

  onRowClick(row: Category): void {
    this.router.navigate(['/products', row.slug]);
  }

  private getCategory(): void {
    const resolvedData = this.route.snapshot.data['resolvedData'];
    this.dataSource = resolvedData.categories.data.items;
  }
}
