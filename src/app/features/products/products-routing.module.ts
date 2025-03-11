import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsPageComponent } from './pages/products-page.component';
import { ProductViewComponent } from './components/product-view/product-view.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsPageComponent,
  },
  {
    path: 'productView/:slug',
    component: ProductViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
