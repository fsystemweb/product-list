import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MaterialModule } from '../../../../vendor/material.module';
import { ProductsHeadComponent } from '../products-head/products-head.component';

@Component({
  selector: 'app-product-view',
  imports: [CommonModule, MaterialModule, ProductsHeadComponent],
  templateUrl: './product-view.component.html',
})
export class ProductViewComponent {}
