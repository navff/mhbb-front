import { Injectable } from '@angular/core';

@Injectable()
export class SharedIdService {
    id: number;
    setId(value: number) {
        return this.id = value;
    }
}
