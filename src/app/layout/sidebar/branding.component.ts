import { Component } from '@angular/core';
import { CoreService } from '../../services/core.service';
import { AppSettings } from '../../config';

@Component({
  selector: 'app-branding',
  standalone: true,
  imports: [],
  template: `
    <a href="/" class="logodark">
      <img src="./assets/images/logos/dark-logo.svg" class="align-middle m-2" alt="logo" />
    </a>
  `,
})
export class BrandingComponent {
  options: AppSettings;

  constructor(private settings: CoreService) {
    this.options = this.settings.getOptions();
  }
}
