import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'myDate'
})
export class DatePipe implements PipeTransform {
    transform(date: string): any {
        let year = date.substr(0 , 4);
        let month = date.substr(5 , 2);
        let day = date.substr(8 , 2);

        let formatted = `${day}.${month}.${year}`;
        return formatted;
    }
}
