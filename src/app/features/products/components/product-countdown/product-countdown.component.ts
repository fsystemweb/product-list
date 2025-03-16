import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { MaterialModule } from '../../../../vendor/material.module';
import { interval, map, takeWhile } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TablerIconsModule } from 'angular-tabler-icons';

@Component({
  selector: 'app-product-countdown',
  imports: [CommonModule, TablerIconsModule, MaterialModule],
  templateUrl: './product-countdown.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCountdownComponent {
  private destroyRef = inject(DestroyRef);
  timeRemaining = signal<string>('');

  constructor() {
    this.startCountdown();
  }

  private startCountdown(): void {
    interval(1000)
      .pipe(
        map(() => this.getTimeUntilMidnight()),
        takeWhile(timeLeft => timeLeft > 0),
        map(this.formatTimeRemaining),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: timeLeft => this.timeRemaining.set(timeLeft),
        complete: () => this.timeRemaining.set('00:00:00'),
      });
  }

  private getTimeUntilMidnight(): number {
    const currentDate = new Date();
    const midnight = new Date(currentDate);
    midnight.setHours(24, 0, 0, 0); // Set to midnight (00:00:00) local time
    return midnight.getTime() - currentDate.getTime();
  }

  private formatTimeRemaining(milliseconds: number): string {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return [hours, minutes, seconds].map(val => val.toString().padStart(2, '0')).join(':');
  }
}
