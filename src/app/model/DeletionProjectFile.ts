export class DeletionProjectFile {

  constructor(
    public filename: string,
    public is_sane: boolean,
    public items_blacklisted: number,
    public items_to_be_deleted: number,
    public items_for_deletion: number,
    public items_to_be_analyzed: number,
    public number_of_errors: number
  ) { }
}
