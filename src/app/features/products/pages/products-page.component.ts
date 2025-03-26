import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MaterialModule } from '../../../vendor/material.module';
import { ProductsTableComponent } from '../components/products-table/products-table.component';

@Component({
  templateUrl: './products-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MaterialModule, ProductsTableComponent],
})
export class ProductsPageComponent {}
