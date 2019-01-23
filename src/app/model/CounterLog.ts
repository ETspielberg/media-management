export class CounterLog  {

  constructor(
    public id: string,
    public sushiprovider: string,
    public status: string,
    public month: number,
    public year: number,
    public comment: string,
    public error: string,
    public timestamp: Date,
    public reportType: string
  ) { }
}
