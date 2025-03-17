import { Product } from '../../../models/product';

export interface ProductsViewDataResolver {
  product: Product;
  recommendations: Product[];
}
