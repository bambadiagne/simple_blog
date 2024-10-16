import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'functionalMessage'
})
export class FunctionalMessagePipe implements PipeTransform {
  transform(value: string, ...args: any[]): any {
    switch (value) {
      case 'required':
        return `The ${args[0]} is required.`;
      case 'pattern':
        return `The format of the field ${args[0]} is incorrect.`;
      case 'ngbDate':
        return `The format of the field ${args[0]} is incorrect.`;
      case 'min':
        return `The field ${args[0]} must be greater than or equal to ${args[1].min.min}.`;
      case 'max':
        return `The field ${args[0]} must be less than or equal to ${args[1].max.max}.`;
    }
    return null;
  }
}
