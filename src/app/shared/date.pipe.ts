import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'myDate'
})
export class DatePipe implements PipeTransform {
    transform(date: string): any {
        return date.substr(0 , 10).replace(/-/g, '.');
    }
}
