import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { MaterialModule } from '../../../../vendor/material.module';
import { ProductImagePipe } from '../../../../pipe/product-image.pipe';
import { Product } from '../../../../models/product';
import { ActivatedRoute, Router } from '@angular/router';

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

  productsRecommendation: Product[] = [
    {
      _id: 'product-1',
      name: 'Product 1',
      slug: 'product-1',
      price: 10,
      category: { name: 'Product 3' },
      image: 'coffee-13.jpg',
      description: 'This is a description for Product 1.',
    },
    {
      _id: 'product-2',
      name: 'Product 2',
      slug: 'product-2',
      price: 15,
      category: { name: 'Product 3' },
      image: 'coffee-14.jpg',
      description: 'This is a description for Product 2.',
    },
    {
      _id: 'product-3',
      name: 'Product 3',
      slug: 'product-3',
      price: 20,
      category: { name: 'Product 3' },
      image: 'coffee-15.jpg',
      description: 'This is a description for Product 3.',
    },
  ];

  onProductClick(product: Product): void {
    const currentUrlSegments = this.router.url.split('/');
    currentUrlSegments[currentUrlSegments.length - 1] = product.slug;
    const newUrl = currentUrlSegments.join('/');

    this.router.navigateByUrl(newUrl, { replaceUrl: true });
  }
}
