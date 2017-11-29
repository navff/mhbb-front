export class Organizer {
  Id?: any;
  Name?: string;
  CityId?: string;
  Sobriety?: boolean;
  Email?: string;
  Phone?: string;
  constructor(data?) {
    if (data) {
      this.Name = data.Name;
      this.CityId = data.CityId;
      this.Sobriety = data.Sobriety;
      this.Email = data.Email;
      this.Phone = data.Phone;
    }
  }
}
