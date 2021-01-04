export class CheckNrwProjectFile {

  constructor(
    public filename: string,
    public items_to_be_deleted: number,
    public items_to_be_checked: number
  ) { }
}
