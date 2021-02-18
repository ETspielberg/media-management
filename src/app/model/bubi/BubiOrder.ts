import {BubiOrderline} from './BubiOrderline';

export class BubiOrder {

  constructor(
    public bubiOrderId: string,
    public almaOrderId: string,
    public bubiStatus: string,
    public paymentStatus: string,
    public bubiOrderLines: BubiOrderline[],
    public comment: string,
    public created: Date,
    public lastChange: Date,
    public totalAmount: number,
    public collectedOn: Date,
    public returnedOn: Date,
    public invoiceNumber: string,
    public invoiceDate: Date
  ) {
  }
}
