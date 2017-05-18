import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'myIsChecked'
})
export class IsCheckedPipe implements PipeTransform {
    transform(items: any[]): any {
        return items.filter(item => item.IsChecked === true ? item : null);
    }
}
