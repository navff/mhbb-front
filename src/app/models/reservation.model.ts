export class Reservation {
  constructor(
    public ActivityId: string,
    public UserEmail: string,
    public Name: string,
    public Phone: string,
    public Comment: any
  ) { }
}
