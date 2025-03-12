import { Product } from './product';

export interface Category {
  slug: string;
  name: string;
  products: Product[];
}
