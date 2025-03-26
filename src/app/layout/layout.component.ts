import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, ViewChild, ViewEncapsulation, inject, DestroyRef } from '@angular/core';
import { MatSidenav, MatSidenavContent } from '@angular/material/sidenav';

import { filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { TablerIconsModule } from 'angular-tabler-icons';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AppNavItemComponent } from './sidebar/nav-item/nav-item.component';
import { navItems } from './sidebar/sidebar-data';
import { MaterialModule } from '../vendor/material.module';
import { CoreService } from '../services/core.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CategoryStateService } from '../state/category-state.service';
import { SpinnerComponent } from './spinner/spinner.component';

const MOBILE_VIEW = 'screen and (max-width: 768px)';
const TABLET_VIEW = 'screen and (min-width: 769px) and (max-width: 1024px)';

@Component({
  selector: 'app-layout',
  imports: [
    RouterModule,
    AppNavItemComponent,
    MaterialModule,
    CommonModule,
    SidebarComponent,
    NgScrollbarModule,
    TablerIconsModule,
    HeaderComponent,
    SpinnerComponent,
  ],
  templateUrl: './layout.component.html',
  styleUrls: [],
  encapsulation: ViewEncapsulation.None,
})
export class LayoutComponent {
  private settings: CoreService = inject(CoreService);
  private router: Router = inject(Router);
  private breakpointObserver: BreakpointObserver = inject(BreakpointObserver);
  private destroyRef = inject(DestroyRef);
  private categoryStateService = inject(CategoryStateService);

  navItems = navItems;

  @ViewChild('leftsidenav')
  sidenav!: MatSidenav;
  resView = false;
  @ViewChild('content', { static: true })
  content: MatSidenavContent | null = null;
  options = this.settings.getOptions();
  private isMobileScreen = false;
  private isContentWidthFixed = true;
  private isCollapsedWidthFixed = false;

  get isOver(): boolean {
    return this.isMobileScreen;
  }

  constructor() {
    this.breakpointObserver
      .observe([MOBILE_VIEW, TABLET_VIEW])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(state => {
        // SidenavOpened must be reset true when layout changes
        this.options.sidenavOpened = true;
        this.isMobileScreen = state.breakpoints[MOBILE_VIEW];
        if (this.options.sidenavCollapsed === false) {
          this.options.sidenavCollapsed = state.breakpoints[TABLET_VIEW];
        }
      });

    // This is for scroll to top
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        if (this.content) {
          this.content.scrollTo({ top: 0 });
        }
      });

    this.loadCategoriesOnSidenav();
  }

  toggleCollapsed(): void {
    if (!this.sidenav) {
      console.warn('Cannot toggle collapsed state: Sidenav not initialized');
      return;
    }
    this.isContentWidthFixed = false;
    this.options.sidenavCollapsed = !this.options.sidenavCollapsed;
    this.resetCollapsedState();
  }

  resetCollapsedState(timer = 400): void {
    setTimeout(() => this.settings.setOptions(this.options), timer);
  }

  onSidenavClosedStart(): void {
    this.isContentWidthFixed = false;
  }

  onSidenavOpenedChange(isOpened: boolean): void {
    this.isCollapsedWidthFixed = !this.isOver;
    this.options.sidenavOpened = isOpened;
  }

  private loadCategoriesOnSidenav(): void {
    this.categoryStateService
      .getCategories()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(data => {
        if (!data) return;

        const newChildren = data.items.map(category => ({
          displayName: category.name,
          iconName: 'coffee',
          route: `/products/${category.slug}`,
        }));

        const categories = this.navItems.find(item => item.displayName === 'Categories');

        if (categories) {
          categories.children = categories.children
            ? [...categories.children, ...newChildren]
            : [...newChildren];
        }
      });
  }
}
