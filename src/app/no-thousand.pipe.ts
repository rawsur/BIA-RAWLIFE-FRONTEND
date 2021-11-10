import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noThousand'
})
export class NoThousandPipe implements PipeTransform {

  transform(value: any): string {
    if (value !== undefined && value !== null) {
      return value.toString().replace(/,/g, '');
    } else {
      return '';
    }
  }

}
