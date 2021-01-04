import {Component, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';

import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {interval} from 'rxjs';
import {CheckNrwProjectService} from '../service/check.nrw.project.service';
import {CheckNrwProjectStatus} from '../model/CheckNrw/CheckNrwProjectStatus';

@Component({
  selector: 'app-ebs-project',
  templateUrl: 'check.nrw.project.component.html',
  providers: [CheckNrwProjectService]
})
export class CheckNrwProjectComponent implements OnInit {

  public busy: boolean;

  public validating: boolean;

  public analyzing: boolean;

  public project_id: string;

  public uploadUrl: string;

  public importing: boolean;

  public status: CheckNrwProjectStatus;

  public file_progress = 0;

  public entry_progress = 0;

  private subscription: any;

  private filesGenerated = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              public checkNrwProjectService: CheckNrwProjectService,
              private messageService: MessageService) {
  }


  ngOnInit() {
    this.file_progress = 0;
    this.entry_progress = 0;
    this.importing = false;
    this.validating = false;
    this.busy = true;
    this.analyzing = false;
    this.route.params.subscribe(
      params => {
        this.project_id = params['project_id'];
        this.uploadUrl = environment.scriptServerAddress + '/stockmanagement/check_nrw/upload/' + this.project_id;
        if (this.checkNrwProjectService.activeProject == null) {
          this.checkNrwProjectService.getProject(this.project_id).subscribe(
            data => {
              this.checkNrwProjectService.activeProject = data;
              this.busy = false;
            }
          );
        }
        this.getStatus();
      }
    );
  }

  uploadFile() {
    this.importing = false;
    this.checkNrwProjectService.getProject(this.project_id).subscribe(
      data => {
        this.checkNrwProjectService.activeProject = data;
      }
    );
  }

  runAnalysis() {
    this.analyzing = true;
    this.checkNrwProjectService.runAnalysis().subscribe(
      data => {
        this.messageService.add({severity: 'success', summary: 'Fertig', detail: data});
        this.analyzing = false;
        this.subscription.unsubscribe();
        this.getStatus();
        this.checkNrwProjectService.getProject(this.project_id).subscribe(
          project => this.checkNrwProjectService.activeProject = project
        );
      },
      error => {
        this.messageService.add({severity: 'error', summary: 'Fehler', detail: 'Ein Fehler ist aufgetreten'});
        console.log(error);
        this.subscription.unsubscribe();
        this.analyzing = false;
      }
    );
    this.subscription = interval(2000).subscribe(() => {
      this.getStatus();
    });
  }

  downloadFile() {
    window.open(environment.scriptServerAddress + '/stockmanagement/check_nrw/downloadFiles/' + this.project_id, '_blank');
  }

  saveChanges() {
    this.checkNrwProjectService.saveActiveProject().subscribe();
  }

  deleteExcelFromFile(filename: string) {
    this.checkNrwProjectService.removeExcelFromProject(this.project_id, filename).subscribe(
      data => {
        this.checkNrwProjectService.activeProject = data;
        this.analyzing = false;
      },
      error => {
        this.messageService.add({severity: 'error', summary: 'Fehler', detail: 'Datei konnte nicht entfernt werden'});
        console.log(error);
        this.analyzing = false;
      }
    );
  }

  getStatus() {
    this.checkNrwProjectService.getStatus(this.project_id).subscribe(
      data => {
        this.status = data;
        if (data.files_processed && data.files_total) {
          this.file_progress = Math.round(data.files_processed / data.files_total * 100);
        } else {
          this.file_progress = 0;
        }
        if (data.entries_processed && data.entries_to_be_analyzed && data.entries_to_be_analyzed !== 0) {
          this.entry_progress = Math.round(data.entries_processed / data.entries_to_be_analyzed * 100);
        } else {
          this.entry_progress = 0;
        }
        if (this.status.status === 'RUNNING') {
          this.analyzing = true;
        } else if (this.status.status === 'FINISHED') {
          this.analyzing = false;
        } else {
          this.analyzing = false;
        }
      },
      error => console.log(error)
    );
  }

  generateLists() {
    this.checkNrwProjectService.generateFiles().subscribe(
      data => {
        this.filesGenerated = true;
        this.messageService.add({
          severity: 'success',
          summary: 'Erstellung erfolgreich',
          detail: 'Alle Listen konnten erfolgreich erstellt werden.'
        });
      }
    );
  }

}
