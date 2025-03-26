import { Component, inject } from '@angular/core';
import { CoreService } from '../../services/core.service';
import { AppSettings } from '../../config';

@Component({
  selector: 'app-branding',
  imports: [],
  template: `
    <a href="/" class="logodark d-flex align-items-center text-decoration-none gap-20">
      <img src="./assets/images/logos/logo.png" class="align-middle" alt="logo" width="40" />
      <span class="f-w-600 f-s-24">{{ options.companyName }}</span>
    </a>
  `,
})
export class BrandingComponent {
  private settings = inject(CoreService);

  options: AppSettings;

  constructor() {
    this.options = this.settings.getOptions();
  }
}
