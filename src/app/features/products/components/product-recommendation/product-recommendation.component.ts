import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
} from '@angular/core';
import { MaterialModule } from '../../../../vendor/material.module';
import { ProductImagePipe } from '../../../../pipe/product-image.pipe';
import { Product } from '../../../../models/product';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-product-recommendation',
  imports: [CommonModule, MaterialModule, ProductImagePipe],
  templateUrl: './product-recommendation.component.html',
  styleUrls: ['./product-recommendation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductRecommendationComponent {
  private destroyRef = inject(DestroyRef);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);
  private ref = inject(ChangeDetectorRef);

  productsRecommendation: Product[] = [];

  constructor() {
    this.getResolvedData();
  }

  onProductClick(product: Product): void {
    const currentUrlSegments = this.router.url.split('/');
    currentUrlSegments[currentUrlSegments.length - 1] = product.slug;
    const newUrl = currentUrlSegments.join('/');

    this.router.navigateByUrl(newUrl, { replaceUrl: true });
  }

  private getResolvedData(): void {
    this.route.data.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(data => {
      this.productsRecommendation = data['resolvedData'].recommendations || [];
      this.ref.markForCheck();
    });
  }
}
