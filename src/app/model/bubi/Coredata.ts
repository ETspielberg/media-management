export class Coredata {

  constructor(
    public collection: string,
    public shelfmark: string,
    public title: string,
    public minting: string,
    public color: string,
    public binding: string,
    public partDescription: string,
    public cover: string,
    public partTitle: string,
    public edition: string,
    public issue: string,
    public year: string,
    public part: string,
    public volume: string,
    public comment: string,
    public mediaType: string,
    public bindingsFollow: string,
    public almaMmsId: string,
    public almaHoldingId: string,
    public active: boolean,
    public vendorId: string,
    public alternativeBubiData: string
  ) {}
}
