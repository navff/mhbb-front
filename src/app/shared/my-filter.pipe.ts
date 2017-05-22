import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'myFilter'
})
export class FilterPipe implements PipeTransform {
    transform(items: any[], value: boolean): any {
        return items.filter(item => item.IsChecked === value);
    }
}
