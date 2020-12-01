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

  public file_progress = 0;

  public entry_progress = 0;

  private subscription: any;

  private filesGenerated = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              public deletionProjectService: DeletionProjectService,
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
        this.uploadUrl = environment.scriptServerAddress + '/stockmanagement/deletion/upload/' + this.project_id;
        if (this.deletionProjectService.activeProject == null) {
          this.deletionProjectService.getProject(this.project_id).subscribe(
            data => {
              this.deletionProjectService.activeProject = data;
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
        this.getStatus();
        this.deletionProjectService.getProject(this.project_id).subscribe(
          project => this.deletionProjectService.activeProject = project
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
    window.open(environment.scriptServerAddress + '/stockmanagement/deletion/downloadFiles/' + this.project_id, '_blank');
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
    this.deletionProjectService.generateFiles().subscribe(
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
