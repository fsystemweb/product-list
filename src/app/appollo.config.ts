import { HttpLink } from 'apollo-angular/http';
import { ApolloLink, from, InMemoryCache } from '@apollo/client/core';
import { inject } from '@angular/core';
import { ApolloClientOptions } from '@apollo/client/core';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { ErrorHandlerService } from './services/error-handler.service';
import { onError } from '@apollo/client/link/error';

const createErrorLink = (errorHandler: ErrorHandlerService): ApolloLink => {
  return onError(error => {
    errorHandler.handleError(error);
  });
};

const uri = `${environment.graphqlServerUrl}${environment.graphqlServerId}/production/graphql`;

export const apolloConfig = (): ApolloClientOptions<any> => {
  const httpLink = inject(HttpLink);
  const errorLink = createErrorLink(inject(ErrorHandlerService));

  const httpLinkInstance = httpLink.create({
    uri,
    headers: new HttpHeaders().set('Authorization', `Bearer ${environment.graphqlServerToken}`),
  });
  return {
    link: from([errorLink, httpLinkInstance]),
    cache: new InMemoryCache(),
  };
};
