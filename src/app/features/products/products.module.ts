import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsPageComponent } from './pages/products-page.component';

@NgModule({
  imports: [ProductsRoutingModule, CommonModule, ProductsPageComponent],
})
export class ProductsModule {}
