import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MaterialModule } from '../../../../vendor/material.module';
import { ProductsHeadComponent } from '../products-head/products-head.component';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../../models/product';

@Component({
  selector: 'app-product-view',
  imports: [CommonModule, MaterialModule, ProductsHeadComponent],
  templateUrl: './product-view.component.html',
})
export class ProductViewComponent {
  private route: ActivatedRoute = inject(ActivatedRoute);
  product: Product = {
    _id: '',
    name: '',
    description: '',
    price: 0,
    category: {
      name: '',
    },
    image: '',
    slug: '',
  };

  constructor() {
    this.getResolvedData();
  }

  private getResolvedData(): void {
    const resolvedData = this.route.snapshot.data['resolvedData'];
    this.product = resolvedData.data;

    console.log(this.product);
  }
}
