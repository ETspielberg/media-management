import {BubiOrderline} from './bubiOrderline';

export class BubiOrder {

  constructor(
    public bubiOrderId: string,
    public almaOrderId: string,
    public bubiStatus: string,
    public bubiOrderLines: BubiOrderline[],
    public comment: string,
    public created: Date,
    public lastChange: Date
  ) {
  }
}
