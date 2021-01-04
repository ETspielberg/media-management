import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CheckNrwProject} from '../model/CheckNrw/CheckNrwProject';
import {CheckNrwProjectService} from '../service/check.nrw.project.service';

@Component({
  selector: 'app-nrw-component',
  templateUrl: 'check.nrw.component.html',
  providers: [CheckNrwProjectService]
})
export class CheckNrwComponent implements OnInit {

  public checkNrwProjectList: CheckNrwProject[];

  public new_project: string;

  public busy: boolean;
  constructor(private checkNrwProjectService: CheckNrwProjectService,
              private router: Router) { }

  ngOnInit() {
    this.busy = true;
    this.checkNrwProjectService.listProjects().subscribe(
      value => {
        this.checkNrwProjectList = value;
        this.checkNrwProjectService.activeProject = this.checkNrwProjectList[0];
        this.busy = false;
      }
    );
  }

  createProject() {
    this.checkNrwProjectService.activeProject = new CheckNrwProject(this.new_project,
      []);
    this.checkNrwProjectService.saveActiveProject().subscribe(
      () => this.router.navigate(['/check_nrw/projects', this.checkNrwProjectService.activeProject.project_id]));
  }
}
