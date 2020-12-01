import {Component, OnInit} from '@angular/core';
import {MessageService, SelectItem} from 'primeng/api';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {ListfilterService} from '../service/listfilter.service';

@Component({
  selector: 'app-listfilter-editor',
  templateUrl: 'list.filter.editor.component.html'
})
export class ListFilterEditorComponent implements OnInit {

  public formatOptions: SelectItem[] = [];

  public modeOptions: SelectItem[] = [];

  public recordTypeOptions: SelectItem[] = [];

  public methodNameOptions: SelectItem[] = [];


  public busy: boolean;

  public filter_id: string;

  public uploadUrl: string;

  public downloadUrl: string;

  public importing: boolean;


  private formats = ['aseq_L', 'listfilter', 'other'];

  private modes = ['append', 'remove'];

  private recordTypes = ['none', 'Portfolio', 'Database', 'Package'];

  private methodNames = ['is_on_list', 'part_on_checklist', 'contains', 'short_contains', 'equals', 'starts_with',
    'char_at_position', 'is_field', 'is_short_field', 'has_title_sys_id', 'test_field_values'];

  constructor(private route: ActivatedRoute,
              private router: Router,
              public listfilterService: ListfilterService,
              private messageService: MessageService) {
  }

  ngOnInit() {
    this.modes.forEach(entry => this.modeOptions.push({label: entry, value: entry}));
    this.formats.forEach(entry => this.formatOptions.push({label: entry, value: entry}));
    this.recordTypes.forEach(entry => this.recordTypeOptions.push({label: entry, value: entry}));
    this.methodNames.forEach(entry => this.methodNameOptions.push({label: entry, value: entry}));
    this.busy = true;
    this.route.params.subscribe(
      params => {
        this.filter_id = params['filter_id'];
        this.uploadUrl = environment.scriptServerAddress + '/filterlist/uploadSource/' + this.filter_id;
        this.downloadUrl = environment.scriptServerAddress + '/ebs/project/download' + this.filter_id + '/download';
        if (this.listfilterService.activeListFilter == null) {
          this.listfilterService.getListFilter(this.filter_id).subscribe(
            data => {
              this.listfilterService.activeListFilter = data;
              this.busy = false;
            }
          );
        }
      }
    );
  }

  uploadFile(event) {
    this.importing = false;
    this.listfilterService.getListFilter(this.filter_id).subscribe(
      data => {
        this.listfilterService.activeListFilter = data;
      }
    );
  }


  saveChanges() {
    this.listfilterService.saveActiveListfilter().subscribe();
  }




}
