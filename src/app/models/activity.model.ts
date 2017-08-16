export class Activity {
  constructor(
    public Name: string,
    public AgeFrom: number,
    public AgeTo: number,
    public Phones: string,
    public Address: string,
    public Prices: string,
    public Mentor: string,
    public Description: string,
    public InterestId: number,
    public IsChecked: boolean,
    public Free: boolean,
    public FormId: string,
    public Organizer?: any,
    public OrganizerId?: number
  ) { }
}
