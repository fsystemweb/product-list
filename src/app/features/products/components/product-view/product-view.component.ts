import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { MaterialModule } from '../../../../vendor/material.module';
import { ProductsHeadComponent } from '../products-head/products-head.component';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../../models/product';
import { ProductImagePipe } from '../../../../pipe/product-image.pipe';
import { ProductCountdownComponent } from '../product-countdown/product-countdown.component';
import { ProductRecommendationComponent } from '../product-recommendation/product-recommendation.component';

@Component({
  selector: 'app-product-view',
  imports: [
    CommonModule,
    MaterialModule,
    ProductsHeadComponent,
    ProductImagePipe,
    ProductCountdownComponent,
    ProductRecommendationComponent,
  ],
  templateUrl: './product-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductViewComponent {
  private route: ActivatedRoute = inject(ActivatedRoute);
  private ref = inject(ChangeDetectorRef);

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

    this.ref.markForCheck();
  }
}
