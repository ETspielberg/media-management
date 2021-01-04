import {CheckNrwProjectFile} from './CheckNrwProjectFile';

export class CheckNrwProject {

  constructor(
    public project_id: string,
    public input_files: CheckNrwProjectFile[]
  ) { }
}
