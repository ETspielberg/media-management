export class BubiOrderline {

  constructor(
    public collection: string,
    public shelfmark: string,
    public counter: number,
    public fund: string,
    public price: number,
    public title: string,
    public minting: string,
    public color: string,
    public binding: string,
    public partDescription: string,
    public volumen: string,
    public cover: string,
    public partTitle: string,
    public edition: string,
    public issue: string,
    public year: string,
    public part: string,
    public comment: string,
    public isFf: boolean,
    public bindingsFollow: string,
    public almaMmsId: string,
    public almaHoldingsId: string,
    public active: boolean,
    public vendorId: string,
    public alternativeBubiData: string,
    public created: Date,
    public lastChange: Date,
    public status: string
  ) {}
}
