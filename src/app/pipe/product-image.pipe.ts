import { Pipe } from '@angular/core';

@Pipe({
  name: 'productImage',
})
export class ProductImagePipe {
  transform(imageName: string): string {
    const productsImagesPath = '/assets/images/products/';
    return `${productsImagesPath}${imageName}`;
  }
}
