import {DeletionProjectFile} from './DeletionProjectFile';

export class DeletionProject {

  constructor(
    public project_id: string,
    public input_files: DeletionProjectFile[],
    public initial_lines: number,
    public all_files_validated: boolean
  ) { }
}
