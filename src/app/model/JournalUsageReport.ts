export class JournalUsageReport {

  constructor(public id: string,
              public group: string,
              public requests: number,
              public items: number,
              public price: number) {
  }
}
