import { inject, Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { firstValueFrom, filter, first, map } from 'rxjs';
import { CategoryStateService } from '../state/category-state.service';

@Injectable({
  providedIn: 'root',
})
export class AppInitGuard implements CanActivate {
  private categoryStateService = inject(CategoryStateService);

  async canActivate(): Promise<boolean> {
    return firstValueFrom(
      this.categoryStateService.getCategories().pipe(
        filter(data => data && data.items.length > 0),
        first(),
        map(() => true)
      )
    );
  }
}
