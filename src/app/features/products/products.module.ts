import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsPageComponent } from './pages/products-page.component';
import { ProductViewComponent } from './components/product-view/product-view.component';

@NgModule({
  imports: [ProductsRoutingModule, CommonModule, ProductsPageComponent, ProductViewComponent],
})
export class ProductsModule {}
