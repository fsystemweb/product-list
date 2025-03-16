import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsPageComponent } from './pages/products-page.component';
import { ProductViewComponent } from './components/product-view/product-view.component';
import { ProductsTableResolver } from './resolvers/products-table.resolver';
import { ProductsViewResolver } from './resolvers/products-view.resolver';

const routes: Routes = [
  {
    path: '',
    component: ProductsPageComponent,
    resolve: { resolvedData: ProductsTableResolver },
  },
  {
    path: 'product-view/:slug',
    component: ProductViewComponent,
    resolve: { resolvedData: ProductsViewResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
