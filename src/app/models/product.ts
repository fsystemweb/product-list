export interface Product {
  _id: string;
  slug: string;
  name: string;
  image: string;
  description: string;
  price: number;
  category: {
    _id: string;
    name: string;
  };
}
