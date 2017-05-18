import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'myFilter'
})
export class FilterPipe implements PipeTransform {
    transform(items: any[], key: string,  value: any): any {
        return items.filter(item => !!item[key] === value);
    }
}
