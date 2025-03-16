import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductCountdownComponent } from './product-countdown.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../../vendor/material.module';
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

describe('ProductCountdownComponent', () => {
  let component: ProductCountdownComponent;
  let fixture: ComponentFixture<ProductCountdownComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        TablerIconsModule.pick(TablerIcons),
        MaterialModule,
        ProductCountdownComponent,
      ],
      declarations: [],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCountdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should start countdown and update timeRemaining every second until midnight', done => {
    const getTimeUntilMidnightSpy = jest
      .spyOn(component as any, 'getTimeUntilMidnight')
      .mockReturnValue(1000);
    const formatTimeRemainingSpy = jest
      .spyOn(component as any, 'formatTimeRemaining')
      .mockReturnValue('23:59:59');

    (component as any).startCountdown();

    setTimeout(() => {
      expect(component.timeRemaining()).toBe('23:59:59');
      done();
    }, 1000);
  });

  it('should stop countdown and set timeRemaining to "00:00:00" when time reaches 0', done => {
    jest.spyOn(component as any, 'getTimeUntilMidnight').mockReturnValue(0);

    (component as any).startCountdown();
    setTimeout(() => {
      expect(component.timeRemaining()).toBe('00:00:00');
      done();
    }, 1000);
  });

  it('should correctly calculate the time remaining until midnight', () => {
    const currentDate = new Date();
    const midnight = new Date(currentDate);
    midnight.setHours(24, 0, 0, 0);

    const result = (component as any).getTimeUntilMidnight();
    const expected = midnight.getTime() - currentDate.getTime();

    expect(result).toBe(expected);
  });

  it('should correctly format the time remaining in "HH:MM:SS" format', () => {
    const result = (component as any).formatTimeRemaining(3600000);
    expect(result).toBe('01:00:00');
  });
});
