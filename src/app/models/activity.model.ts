import { Organizer } from './organizer.model';
import { Picture } from './picture.model';

export class Activity {
  Id?: string;
  Name?: string;
  AgeFrom?: number;
  AgeTo?: number;
  Phones?: string;
  Address?: string;
  Prices?: string;
  Mentor?: string;
  Description?: string;
  InterestId?: number;
  IsChecked?: boolean;
  Free?: boolean;
  FormId?: string;
  Organizer?: Organizer;
  OrganizerId?: string;
  Interest?: any;
  Pictures?: Picture[];
  Voices?: number;

  constructor(act?) {
    if (act) {
      this.Name = act.Name;
      this.AgeFrom = act.AgeFrom;
      this.AgeTo = act.AgeTo;
      this.Phones = act.Phones;
      this.Address = act.Address;
      this.Prices = act.Prices;
      this.Mentor = act.Mentor;
      this.Description = act.Description;
      this.InterestId = act.Interest.Id;
      this.IsChecked = act.IsChecked;
      this.Free = act.Free;
      this.FormId = act.FormId;
      this.Organizer = act.Organizer;
      this.OrganizerId = act.Organizer.Id;
    } else {
      this.Organizer = {};
      this.IsChecked = false;
    }
  }
}
