import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MaterialModule } from '../../../../vendor/material.module';
import { CategoryStateService } from '../../../../state/category-state.service';
import { catchError, map, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-products-head',
  imports: [CommonModule, MaterialModule],
  templateUrl: './products-head.component.html',
  styleUrls: ['./products-head.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsHeadComponent {
  private route: ActivatedRoute = inject(ActivatedRoute);
  private categoryStateService = inject(CategoryStateService);

  name$ = this.route.params.pipe(
    map(params => params['slug'] || ''),
    switchMap(slug =>
      this.categoryStateService.getCategories().pipe(
        map(categories => {
          const category = categories.items.find(c => c.slug === slug);
          return category?.name || '';
        })
      )
    ),
    catchError(error => {
      return of('');
    })
  );
}
