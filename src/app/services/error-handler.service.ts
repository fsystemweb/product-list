import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  handleError(error: any): string {
    if (error.graphQLErrors) {
      return error.graphQLErrors.map((err: any) => err.message).join(', ');
    } else if (error.networkError) {
      return `Network error: ${error.networkError.message}`;
    } else {
      return 'An unknown error occurred';
    }
  }
}
