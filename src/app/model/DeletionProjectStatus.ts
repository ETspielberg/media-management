export class DeletionProjectStatus {

  constructor(
    public status: string,
    public files_total: number,
    public files_processed: number,
    public entries_total: number,
    public entries_processed: number,
    public number_of_errors: number
  ) { }
}
