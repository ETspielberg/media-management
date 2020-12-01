import {Component, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';

import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {DeletionProjectService} from '../service/deletion.project.service';
import {DeletionProjectStatus} from '../model/DeletionProjectStatus';
import {interval} from 'rxjs';

@Component({
  selector: 'app-ebs-project',
  templateUrl: 'deletion.project.component.html',
  providers: [DeletionProjectService]
})
export class DeletionProjectComponent implements OnInit {

  public busy: boolean;

  public validating: boolean;

  public analyzing: boolean;

  public project_id: string;

  public uploadUrl: string;

  public importing: boolean;

  public status: DeletionProjectStatus;

  public file_progress = 50;

  public entry_progress = 50;

  private subscription: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              public deletionProjectService: DeletionProjectService,
              private messageService: MessageService) {
  }


  ngOnInit() {
    this.importing = false;
    this.validating = false;
    this.busy = true;
    this.analyzing = false;
    this.route.params.subscribe(
      params => {
        this.project_id = params['project_id'];
        this.uploadUrl = environment.scriptServerAddress + '/stockmanagement/deletion/upload/' + this.project_id;
        if (this.deletionProjectService.activeProject == null) {
          this.deletionProjectService.getProject(this.project_id).subscribe(
            data => {
              this.deletionProjectService.activeProject = data;
              this.busy = false;
              console.log(data.input_files[0].is_sane);
            }
          );
        }
        this.getStatus();
      }
    );
  }

  uploadFile() {
    this.importing = false;
    this.deletionProjectService.getProject(this.project_id).subscribe(
      data => {
        this.deletionProjectService.activeProject = data;
      }
    );
  }

  runAnalysis() {
    this.analyzing = true;
    this.deletionProjectService.runAnalysis().subscribe(
      data => {
        this.messageService.add({severity: 'success', summary: 'Fertig', detail: data});
        this.analyzing = false;
        this.subscription.unsubscribe();
      },
      error => {
        this.messageService.add({severity: 'error', summary: 'Fehler', detail: 'Ein Fehler ist aufgetreten'});
        console.log(error);
        this.analyzing = false;
      }
    );
    this.subscription = interval(2000).subscribe(() => {
      this.getStatus();
    });
  }

  downloadFile() {
    window.open(environment.scriptServerAddress + '/ebs/project/download/' + this.project_id, '_blank');
  }

  saveChanges() {
    this.deletionProjectService.saveActiveProject().subscribe();
  }

  checkValidity() {
    this.validating = true;
    this.deletionProjectService.checkValidity(this.project_id).subscribe(
      data => {
        this.deletionProjectService.activeProject = data;
        this.validating = false;
        if (this.deletionProjectService.activeProject.all_files_validated) {
          this.messageService.add({
            severity: 'success',
            summary: 'Validierung erfolgreich',
            detail: 'Alle Dateien konnten erfolgreich validiert werden.'
          });
        } else {
          this.messageService.add({
            severity: 'warning',
            summary: 'Validierung nicht erfolgreich',
            detail: 'Es konnten nicht alle Dateien erfolgreich validiert werden.'
          });
        }
      },
      error => {
        console.log(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Fehler',
          detail: 'Bei derdurchführung der Validierung ist ein Fehler aufgetreten.'
        });
        this.validating = false;
      }
    );
  }

  deleteExcelFromFile(filename: string) {
    this.deletionProjectService.removeExcelFromProject(this.project_id, filename).subscribe(
      data => {
        this.deletionProjectService.activeProject = data;
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
    this.deletionProjectService.getStatus(this.project_id).subscribe(
      data => this.status = data,
      error => console.log(error)
    );
    if (this.status) {
      if (this.status.files_processed && this.status.files_total) {
        this.file_progress = Math.round(this.status.files_processed / this.status.files_total * 100);
      } else {
        this.file_progress = 0.1;
      }
      if (this.status.entries_processed && this.status.entries_total) {
        this.entry_progress = Math.round(this.status.entries_processed / this.status.entries_total * 100);
      } else {
        this.entry_progress = 0.1;
      }
      if (this.status.status === 'RUNNING') {
        this.subscription = interval(2000).subscribe(() => {
          this.getStatus();
        });
        this.analyzing = true;
      } else {
        this.subscription.unsubscribe();
        this.analyzing = false;
      }
    }
  }

}
