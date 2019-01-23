export class Dataset {

  constructor(
    public name: string,
    public data: number[][],
    public color?: string,
    public zIndex?: number,
    public id?: string,
    public linkedTo?: string,
    public stack?: string
  ) {}
}
