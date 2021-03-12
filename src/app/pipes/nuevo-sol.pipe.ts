import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nuevoSol'
})
export class NuevoSolPipe implements PipeTransform {
  transform(value: any): string {
    let final = `S/. ${value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
    return final;
  }
}
