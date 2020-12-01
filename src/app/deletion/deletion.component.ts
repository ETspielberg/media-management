import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DeletionProjectService} from '../service/deletion.project.service';
import {DeletionProject} from '../model/DeletionProject';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-deletion',
  templateUrl: 'deletion.component.html',
  providers: [DeletionProjectService]
})
export class DeletionComponent implements OnInit {

  public deletionProjectList: DeletionProject[];

  public new_project: string;

  public busy: boolean;
  public blacklistLoading: boolean;

  public blacklistFiles: string[];

  public blacklistUploadUrl: string;

  public isSigellist: boolean;

  public sigellistUploadUrl: string;

  constructor(private deletionProjectService: DeletionProjectService,
              private router: Router) { }

  ngOnInit() {
    this.isSigellist = false;
    this.busy = true;
    this.blacklistUploadUrl = environment.scriptServerAddress + '/stockmanagement/deletion/uploadblacklistfile';
    this.sigellistUploadUrl = environment.scriptServerAddress + '/stockmanagement/sigellistupload';
    this.updateBlacklistfiles();
    this.checkSigellist();
    this.deletionProjectService.listProjects().subscribe(
      value => {
        this.deletionProjectList = value;
        this.deletionProjectService.activeProject = this.deletionProjectList[0];
        this.busy = false;
      }
    );
  }

  checkSigellist() {
    this.deletionProjectService.checkSigelScoreList().subscribe(
      () => {
        this.isSigellist = true;
      },
      error => {
        this.isSigellist = false;
      }
    );
  }

  updateBlacklistfiles() {
    this.blacklistLoading = true;
    this.deletionProjectService.getBlacklistList().subscribe(
      data => {
        this.blacklistFiles = data;
        this.blacklistLoading = false;
        console.log(this.blacklistFiles);
      }
    );
  }

  createProject() {
    this.deletionProjectService.activeProject = new DeletionProject(this.new_project,
      [],
      0,
      false,
      5);
    this.deletionProjectService.saveActiveProject().subscribe(
      () => this.router.navigate(['/deletion/projects', this.deletionProjectService.activeProject.project_id]));
  }
}
