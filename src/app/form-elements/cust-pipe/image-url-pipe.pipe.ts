import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imageUrlPipe'
})
export class ImageUrlPipePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    return value.split('/').pop();
  }

}
