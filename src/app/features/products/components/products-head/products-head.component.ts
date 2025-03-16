import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MaterialModule } from '../../../../vendor/material.module';

@Component({
  selector: 'app-products-head',
  imports: [CommonModule, MaterialModule],
  templateUrl: './products-head.component.html',
  styleUrls: ['./products-head.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsHeadComponent {
  title = input<string | undefined | null>();
}
