import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MaterialModule } from '../../../../vendor/material.module';

@Component({
  templateUrl: './dashboard-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MaterialModule],
  standalone: true,
  selector: 'app-dashboard-card',
})
export class DashboardCardComponent {
  title = input.required<string>();
  number = input.required<number>();
  image = input.required<string>();
}
