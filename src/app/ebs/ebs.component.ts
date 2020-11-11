import {Component, OnInit} from '@angular/core';
import {EbsProjectService} from '../service/ebs.project.service';
import {EbsProject} from '../model/EbsProject';
import {Router} from '@angular/router';

@Component({
  selector: 'app-ebs',
  templateUrl: 'ebs.component.html',
  providers: [EbsProjectService]
})
export class EbsComponent implements OnInit {

  public ebsProjectList: EbsProject[];

  public new_project: string;

  public busy: boolean;

  constructor(private ebsProjectService: EbsProjectService,
              private router: Router) { }

  ngOnInit() {
    this.busy = true;
    this.ebsProjectService.listProjects().subscribe(
      value => {
        this.ebsProjectList = value;
        console.log(value);
        this.ebsProjectService.activeProject = this.ebsProjectList[0];
        this.busy = false;
      }
    );
  }

  createProject() {
    this.ebsProjectService.activeProject = new EbsProject(this.new_project,
      '',
      10000,
      'price_normalized_percentiles');
    this.ebsProjectService.saveActiveProject().subscribe(
      () => this.router.navigate(['/ebs/project', this.ebsProjectService.activeProject.project_id]));
  }
}
