import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MaterialModule } from '../../../../vendor/material.module';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-products-head',
  imports: [CommonModule, MaterialModule],
  templateUrl: './products-head.component.html',
  styleUrls: ['./products-head.component.scss'],
  standalone: true,
})
export class ProductsHeadComponent {
  private route: ActivatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
  name: string = '';

  constructor() {
    this.setName();
  }

  setName(): void {
    this.route.params.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(params => {
      this.name = params['slug'] || '';
    });
  }
}
