export class Activity{
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
    }
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
    }
    IsChecked: boolean;
    Pictures: {
        Id: number;
        Url: string;
        IsMain: boolean;
    }
}