export class User {
  Email: string;
  Name: string;
  Phone: string;
  Role: number;
  CityId: any;
  FormId: any;
  RoleName: string;
  Picture?: any;

  constructor(data?: any) {
    if (data) {
      this.Email = data.Email;
      this.Name = data.Name;
      this.Phone = data.Phone;
      this.CityId = data.CityId;
      this.Role = data.Role;
    }
  }
}
