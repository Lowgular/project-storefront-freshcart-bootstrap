import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'metersToKilometers'
})
export class MetersToKilometersPipe implements PipeTransform {

  transform(value: number): unknown {
    return Math.round(value/1000);
  }

}
