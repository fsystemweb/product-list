import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
} from '@angular/core';
import { MaterialModule } from '../../../../vendor/material.module';
import { ProductsHeadComponent } from '../products-head/products-head.component';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../../models/product';
import { ProductImagePipe } from '../../../../pipe/product-image.pipe';
import { ProductCountdownComponent } from '../product-countdown/product-countdown.component';
import { ProductRecommendationComponent } from '../product-recommendation/product-recommendation.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
  private destroyRef = inject(DestroyRef);

  product: Product = {
    _id: '',
    name: '',
    description: '',
    price: 0,
    category: {
      _id: '',
      name: '',
    },
    image: '',
    slug: '',
  };

  constructor() {
    this.getResolvedData();
  }

  private getResolvedData(): void {
    this.route.data.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(data => {
      this.product = data['resolvedData'].product;
      this.ref.markForCheck();
    });
  }
}
