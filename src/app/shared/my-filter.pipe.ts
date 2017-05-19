import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'myFilter'
})
export class FilterPipe implements PipeTransform {
    transform(items: any[],  value: any, key1?: string, key2?: string): any {
        if (key2 === 'Sobriety') {
            return  value === true  ? items.filter(item => item[key1][key2] === value) : items;
        }
        if (key1 === 'Prices') {
            return value === false ? items.filter(item => !!item[key1] === value) : items;
        }
        if (key1 === 'Interest') {
            return value ? items.filter(item => item[key1][key2] === value) : items;
        }
        if (key1 === 'age') {
            return value ? items.filter(item => item.AgeFrom <= +value && +value <= item.AgeTo) : items;
        }
    }
}
