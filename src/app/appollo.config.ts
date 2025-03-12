import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';
import { inject } from '@angular/core';
import { ApolloClientOptions } from '@apollo/client/core';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

const uri = `${environment.graphqlServerUrl}${environment.graphqlServerId}/production/graphql`;

export const apolloConfig = (): ApolloClientOptions<any> => {
  const httpLink = inject(HttpLink);
  return {
    link: httpLink.create({
      uri,
      headers: new HttpHeaders().set('Authorization', `Bearer ${environment.graphqlServerToken}`),
    }),
    cache: new InMemoryCache(),
  };
};
