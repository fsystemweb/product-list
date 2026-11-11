import type {
  GetCategoriesQuery,
  GetCategoryQuery,
  GetProductBySlugQueryVariables,
  GetProductQuery,
  GetProductRecommendationsQueryVariables,
  GetProductsQuery,
} from './generated';

/** Canonical product shape used to build every demo response. */
interface DemoProduct {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  image: string;
  category: DemoCategory;
}

/** Canonical category shape used to build every demo response. */
interface DemoCategory {
  _id: string;
  name: string;
  slug: string;
}

const demoCategories: DemoCategory[] = [
  { _id: 'coffee-beans', name: 'Coffee Beans', slug: 'coffee-beans' },
  { _id: 'coffee-machines', name: 'Coffee Machines', slug: 'coffee-machines' },
  { _id: 'coffee-accessories', name: 'Coffee Accessories', slug: 'coffee-accessories' },
];

const demoProducts: DemoProduct[] = [
  {
    _id: 'colombian-arabica-70',
    name: 'Colombian Arabica 70/30',
    slug: 'colombian-arabica-70',
    description: 'Single origin medium roast from the Colombian mountains.',
    price: 9.5,
    image: 'coffee-bean-goldbag.jpg',
    category: demoCategories[0],
  },
  {
    _id: 'ethiopian-dark-roast',
    name: 'Ethiopian Dark Roast',
    slug: 'ethiopian-dark-roast',
    description: 'Burnt caramel notes with a chocolate finish for a bold cup.',
    price: 11,
    image: 'arabica-ethiopian.jpg',
    category: demoCategories[0],
  },
  {
    _id: 'kenyan-aromatic-fresh',
    name: 'Kenyan Aromatic Fresh',
    slug: 'kenyan-aromatic-fresh',
    description: 'Golden halo roast with floral and blackberry notes.',
    price: 10,
    image: 'kenya-aromatic-fresh.jpg',
    category: demoCategories[0],
  },
  {
    _id: 'keystone-supreme',
    name: 'Keystone Supreme',
    slug: 'keystone-supreme',
    description: 'Kitchen-grade machine with automatic grind and digital scale.',
    price: 749,
    image: 'keystone-supreme.jpg',
    category: demoCategories[1],
  },
  {
    _id: 'goldmonkey-corner-machine',
    name: 'Goldmonkey Corner Machine',
    slug: 'goldmonkey-corner-machine',
    description: 'Compact machine built for small kitchens and hotels.',
    price: 329,
    image: 'goldmonkey-corner-machine.jpg',
    category: demoCategories[1],
  },
  {
    _id: 'ceramic-dripper',
    name: 'Ceramic Dripper',
    slug: 'ceramic-dripper',
    description: 'Slow drip coffee straight into the cup, no paper needed.',
    price: 29,
    image: 'ceramic-dripper.jpg',
    category: demoCategories[2],
  },
  {
    _id: 'electric-kettle-1-5l',
    name: 'Electric Kettle 1.5L',
    slug: 'electric-kettle-1-5l',
    description: 'Electric kettle with keep-warm function for slow mornings.',
    price: 49,
    image: 'electric-kettle.jpg',
    category: demoCategories[2],
  },
];

const productsOfCategory = (category: DemoCategory): DemoProduct[] =>
  demoProducts.filter(product => product.category._id === category._id);

const findProductById = (_id: string | undefined): DemoProduct | null =>
  demoProducts.find(product => product._id === _id) ?? null;

const findProductBySlugFilter = (where: GetProductBySlugQueryVariables): DemoProduct | null => {
  const slug = where?.where?.slug?.eq;
  return slug ? (demoProducts.find(product => product.slug === slug) ?? null) : null;
};

/**
 * Products matching the recommendation filter (`where.category._id` and
 * excluding `where.NOT._id`), trimmed to `size` items (3 by default, as in
 * the `getProductRecommendations` service call).
 */
const recommendationCandidates = (
  where: GetProductRecommendationsQueryVariables
): DemoProduct[] => {
  const size = where?.size ?? 3;
  const categoryId = where?.where?.category?._id?.eq;
  const excludedId = where?.where?.NOT?._id?.eq;
  return demoProducts
    .filter(product => product.category._id === categoryId)
    .filter(product => product._id !== excludedId)
    .slice(0, size);
};

// ---------------------------------------------------------------------------
// Typed response builders, deriving from the generated query/operation types.
// ---------------------------------------------------------------------------

const productListItem = (
  product: DemoProduct
): GetProductsQuery['getProductList']['items'][number] => ({
  _id: product._id,
  name: product.name,
  slug: product.slug,
  description: product.description,
  price: product.price,
  image: product.image,
  category: {
    _id: product.category._id,
    name: product.category.name,
    slug: product.category.slug,
  },
});

const productDetail = (product: DemoProduct | null): GetProductQuery['getProduct'] =>
  product && {
    _id: product._id,
    name: product.name,
    slug: product.slug,
    description: product.description,
    price: product.price,
    image: product.image,
    category: {
      _id: product.category._id,
      name: product.category.name,
      slug: product.category.slug,
    },
  };

/** Products nested in a `GetCategories` response: no image/category fields. */
const productBriefInCategory = (
  product: DemoProduct
): GetCategoriesQuery['getCategoryList']['items'][number]['products'][number] => ({
  _id: product._id,
  name: product.name,
  slug: product.slug,
  description: product.description,
  price: product.price,
});

/** Products nested in a `GetCategory` response: with image, no nested category. */
const productInCategoryDetail = (
  product: DemoProduct
): NonNullable<GetCategoryQuery['getCategory']>['products'][number] => ({
  _id: product._id,
  name: product.name,
  slug: product.slug,
  description: product.description,
  price: product.price,
  image: product.image,
});

export {
  demoCategories,
  demoProducts,
  findProductBySlugFilter,
  findProductById,
  productBriefInCategory,
  productDetail,
  productInCategoryDetail,
  productListItem,
  productsOfCategory,
  recommendationCandidates,
};
