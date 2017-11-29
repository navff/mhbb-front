export class Picture {
    Id?: string;
    Url?: string;
    constructor(data?: any) {
        if (data) {
            this.Id = data.Id;
            this.Url = data.Url;
        }
    }
}