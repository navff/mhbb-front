export class TempFile {
  Id?: string;
  constructor(
    public FormId: string,
    public Filename: string,
    public Data: any,
    public IsMain: boolean
  ) { }
}
