import { ApolloQueryResult } from '@apollo/client/core';
import { ApolloArray } from '../../../models/arrays-apollo';
import { Product } from '../../../models/product';

export interface DashboardData {
  products: ApolloQueryResult<ApolloArray<Product>>;
}
