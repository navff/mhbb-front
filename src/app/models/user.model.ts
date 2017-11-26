export class User {
  Email: string;
  Name: string;
  Phone: string;
  Role: number;
  CityId: any;
  FormId: any;
  RoleName: string;

  constructor(data?: any, roleValue?: boolean, formId?: string) {
    if (data) {
      this.Email = data.Email;
      this.Name = data.Name;
      this.Phone = data.Phone;
      this.CityId = data.CityId;
    }
    this.Role = roleValue ? 1 : 2;
    this.FormId = formId;
  }
}
