import { TypeModifier } from '@angular/compiler/src/output/output_ast';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'quarterDecimal'
})
export class QuarterDecimalPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if (typeof value === 'number') {
      return +(Math.floor(value * 4) / 4).toFixed(2);
    }
    return null;
  }

}
