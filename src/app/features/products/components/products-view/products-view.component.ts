import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MaterialModule } from '../../../../vendor/material.module';

@Component({
  selector: 'app-product-view',
  imports: [CommonModule, MaterialModule],
  templateUrl: './product-view.component.html',
})
export class ProductsViewComponent {}
