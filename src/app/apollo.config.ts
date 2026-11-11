import { HttpLink } from 'apollo-angular/http';
import { ApolloClientOptions, ApolloLink, InMemoryCache, from } from '@apollo/client/core';
import { inject } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { ErrorHandlerService } from './services/error-handler.service';
import { DemoFallbackLink } from './graphql/demo-fallback.link';
import { createDemoLink } from './graphql/demo-link';
import { onError } from '@apollo/client/link/error';

const createErrorLink = (errorHandler: ErrorHandlerService): ApolloLink => {
  return onError(error => {
    errorHandler.handleError(error);
  });
};

const isConfiguredServer = (): boolean =>
  !!environment.graphqlServerUrl && environment.graphqlServerUrl !== 'insert-server-url';

/**
 * Apollo client setup.
 *
 * - When the backend is configured, the HTTP link is used and automatically
 *   falls back to deterministic demo data when the backend is unreachable
 *   (network error) - see `DemoFallbackLink`. The fallback keeps this demo
 *   site usable when the Takeshape endpoint goes away.
 * - When `environment.graphqlMockMode` is on, or the backend has never been
 *   configured (placeholder URL in `environment.ts`), the demo link serves
 *   every query from local mock data without contacting the network at all.
 */
export const apolloConfig = (): ApolloClientOptions<any> => {
  const errorLink = createErrorLink(inject(ErrorHandlerService));
  const demoLink = createDemoLink();

  if (environment.graphqlMockMode || !isConfiguredServer()) {
    return {
      link: from([errorLink, demoLink]),
      cache: new InMemoryCache(),
    };
  }

  const uri = `${environment.graphqlServerUrl}${environment.graphqlServerId}/production/graphql`;
  const httpLinkInstance = inject(HttpLink).create({
    uri,
    headers: new HttpHeaders().set('Authorization', `Bearer ${environment.graphqlServerToken}`),
  });

  return {
    link: from([
      errorLink,
      new DemoFallbackLink({ primary: httpLinkInstance, fallback: demoLink }),
    ]),
    cache: new InMemoryCache(),
  };
};
