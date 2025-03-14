import { inject, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  private toastrService = inject(ToastrService);

  handleError(error: any): void {
    if (error.graphQLErrors) {
      this.toastrService.error(
        `GraphQL error: ${error.graphQLErrors.map((err: any) => err.message).join(', ')}`
      );
    } else if (error.networkError) {
      this.toastrService.error(`Network error: ${error.networkError.message}`);
    } else {
      this.toastrService.error(`Unknown error: ${error.message}`);
    }
  }
}
