import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'messageFonctionnel'
})
export class FunctionalMessagePipe implements PipeTransform {
  transform(value: string, ...args: any[]): any {
    switch (value) {
      case 'required':
        return `Le champ ${args[0]} est requis.`;
      case 'pattern':
        return `Le format du champ ${args[0]} est incorrect.`;
      case 'ngbDate':
        return `Le format du champ ${args[0]} est incorrect.`;
      case 'min':
        return `Le champ ${args[0]} doit être supérieur ou égal à ${args[1].min.min}.`;
      case 'max':
        return `Le champ ${args[0]} doit être inférieur ou égal à ${args[1].max.max}.`;
    }
    return null;
  }
}
