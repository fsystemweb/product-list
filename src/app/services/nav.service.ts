import { inject, Injectable, signal } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class NavService {
  private router: Router = inject(Router);
  showClass: any = false;

  currentUrl = signal<string | undefined>(undefined);

  constructor() {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl.set(event.urlAfterRedirects);
      }
    });
  }
}
