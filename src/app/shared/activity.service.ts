import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class ActivityService {
    constructor(private http: Http) {}

    getAllActivities() {
        return this.http.get('http://test.mhbb.ru/b/api/activity/search');
    }
}

export class Activity {
    Id: number;
    Name: string;
    Organizer: {
        Id: number;
        Name: string;
        CityId: number;
        City: {
            Id: number;
            Name: string;
        }
        Sobriety: boolean;
    };
    AgeFrom: number;
    AgeTo: number;
    Phones: string;
    Adress: string;
    Prices: string;
    Mentor: string;
    Description: string;
    Interest: {
        Id: number;
        Name: string;
    };
    IsChecked: boolean;
    Pictures: {
        Id: number;
        Url: string;
        IsMain: boolean;
    };
}
