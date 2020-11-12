import {Component, OnInit} from '@angular/core';
import {EbsProjectService} from '../service/ebs.project.service';
import {MessageService} from 'primeng/api';
import {SelectItem} from 'primeng/api';

import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-ebs-project',
  templateUrl: 'ebs.project.component.html',
  providers: [EbsProjectService]
})
export class EbsProjectComponent implements OnInit {

  public modeOptions: SelectItem[] = [];

  public busy: boolean;

  public project_id: string;

  public uploadUrl: string;

  public downloadUrl: string;

  public importing: boolean;


  private modes = ['price_normalized_percentiles', 'only_usage', 'only_cost_per_usage',
    'percentage_normalized_percentiles', 'usage_normalized_percentiles', 'index', 'index_weighting', 'value_weighting',
    'index_weighting_exponential', 'value_weighting_exponential'];

  constructor(private route: ActivatedRoute,
              private router: Router,
              public ebsProjectService: EbsProjectService,
              private messageService: MessageService) {
  }


  ngOnInit() {
    this.importing = false;
    this.modes.forEach(
      entry => this.modeOptions.push({label: entry, value: entry}));
    this.busy = true;
    this.route.params.subscribe(
      params => {
        this.project_id = params['project_id'];
        this.uploadUrl = environment.scriptServerAddress + '/ebs/project/' + this.project_id + '/upload';
        this.downloadUrl = environment.scriptServerAddress + '/ebs/project/download' + this.project_id + '/download';
        if (this.ebsProjectService.activeProject == null) {
          this.ebsProjectService.getProject(this.project_id).subscribe(
            data => {
              this.ebsProjectService.activeProject = data;
              this.busy = false;
            }
          );
        }
      }
    );
  }

  uploadFile(event) {
    this.importing = false;
    this.ebsProjectService.getProject(this.project_id).subscribe(
      data => {
        this.ebsProjectService.activeProject = data;
      }
    );
  }

  runAnalysis() {
    this.ebsProjectService.runAnalysis().subscribe(
      data => this.messageService.add({severity: 'success', summary: 'Fertig', detail: data}),
      error => {
        this.messageService.add({severity: 'error', summary: 'Fehler', detail: 'Ein Fehler ist aufgetreten'});
        console.log(error);
      }
    );
  }

  downloadFile() {
    window.open(environment.scriptServerAddress + '/ebs/project/download/' + this.project_id, '_blank');
  }

  saveChanges() {
    this.ebsProjectService.saveActiveProject().subscribe();
  }
}
