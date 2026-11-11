import { ApolloLink, Observable } from '@apollo/client/core';
import type { FetchResult, NextLink, Operation } from '@apollo/client/core';

interface DemoFallbackLinkOptions {
  /** The link that targets the real backend (usually the HTTP link). */
  primary: ApolloLink;
  /** The link used when the primary link fails with a network error. */
  fallback: ApolloLink;
}

const hasNetworkError = (error: unknown): boolean =>
  !!error &&
  typeof error === 'object' &&
  'networkError' in error &&
  Boolean((error as { networkError?: unknown }).networkError);

/**
 * Runs every operation against the primary link (the real GraphQL backend).
 *
 * Only when the primary link fails with a *network* error - e.g. the Takeshape
 * endpoint is unreachable, DNS failure, CORS/global outage - is the exact same
 * operation replayed against the fallback link, which serves deterministic
 * demo responses. GraphQL errors returned by a reachable server are passed
 * through untouched: the demo data must not hide them.
 */
class DemoFallbackLink extends ApolloLink {
  constructor(private readonly options: DemoFallbackLinkOptions) {
    super();
  }

  override request(operation: Operation, forward?: NextLink): Observable<FetchResult> | null {
    const { primary, fallback } = this.options;
    const primaryResult = primary.request(operation, forward);
    if (!primaryResult) {
      return primaryResult;
    }

    return new Observable<FetchResult>(subscriber => {
      primaryResult.subscribe({
        next: result => subscriber.next(result),
        error: (error: Error) => {
          const fallbackResult = hasNetworkError(error) ? fallback.request(operation) : null;
          if (!fallbackResult) {
            subscriber.error(error);
            return;
          }
          fallbackResult.subscribe({
            next: result => subscriber.next(result),
            error: (fallbackError: Error) => subscriber.error(fallbackError),
            complete: () => subscriber.complete(),
          });
        },
        complete: () => subscriber.complete(),
      });
    });
  }
}

export { DemoFallbackLink };
