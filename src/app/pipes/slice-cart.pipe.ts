import { Pipe, PipeTransform } from '@angular/core';
import { SlicePipe } from '@angular/common';


@Pipe({
  name: 'sliceCart'
})
export class SliceCartPipe implements PipeTransform {

  private slicePipe : SlicePipe = new SlicePipe();

  transform(value: string, ...args: any[]): any {
    let sliced = this.slicePipe.transform(value, 0, 20);
    if (value.length >= 20) {
      sliced = sliced + '...';
    }
    return sliced;
  }

}
