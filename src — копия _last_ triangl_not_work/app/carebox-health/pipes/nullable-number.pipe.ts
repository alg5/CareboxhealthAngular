import { DecimalPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({name: 'nullablenumber'})
export class NullableNumberPipe implements PipeTransform {

  constructor(private decimalPipe: DecimalPipe){}
  
  transform(value?: number): number | string {
    let res = this.decimalPipe.transform(value, "1.0");
    if (!res)
    {
      res = "N/A";
    }
    return res;
  }
}