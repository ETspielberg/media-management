export class Bubidata {

  constructor(
    public vendorId: string,
    public vendorAccount: string,
    public name: string,
    public shortName: string,
    public campus: string,
    public standardPriceJournal: number,
    public standardPriceMonograph: number,
    public active: boolean
  ) {}
}
