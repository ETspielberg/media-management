export class CounterStats {

  constructor(public identifier: string,
              public month: number,
              public year: number,
              public requests: number,
              public items: number) {
  }
}
