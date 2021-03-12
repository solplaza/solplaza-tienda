import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'moneda'
})

export class MonedaPipe implements PipeTransform {
  transform(value: string): String {
    const formateoNuevoSol = new Intl.NumberFormat('es-PE',{
      currency: 'PEN',
      style: 'currency'
    })

    return `${formateoNuevoSol.format(parseInt(value))}`;
  }
}