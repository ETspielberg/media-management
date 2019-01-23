import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {
  ConfirmDialogModule, DropdownModule, FileUploadModule, GrowlModule, InputTextModule, MultiSelectModule,
  ProgressSpinnerModule, ToggleButtonModule
} from 'primeng/primeng';
import {FileService} from '../service/file.service';
import {JournalCollectionService} from '../service/journal.collection.service';
import {JournalService} from '../service/journal.service';
import {JournalTitleService} from '../service/journal.title.service';
import {TableModule} from 'primeng/table';
import {DialogModule} from 'primeng/dialog';
import {TranslateModule} from '../translate/translate.module';
import {HttpClientModule} from '@angular/common/http';
import {ConfirmationService} from 'primeng/api';
import {CounterLogSercvice} from '../service/counter.log.sercvice';
import {reportRouting} from './reports.routing';
import {ReportsComponent} from './reports.component';
import {ChartModule} from 'angular2-highcharts';

import * as highcharts from 'highcharts';
import HighchartsExporting from 'highcharts/modules/exporting.src';
import {HighchartsStatic} from 'angular2-highcharts/dist/HighchartsService';
import {CardModule} from 'primeng/card';


export function highchartsFactory() {
  const hc = require('highcharts');
  const dd = require('highcharts/modules/drilldown');
  dd(hc);
  return hc;
}

@NgModule({
  imports: [HttpClientModule,
    RouterModule,
    CommonModule,
    InputTextModule,
    FormsModule,
    FileUploadModule,
    GrowlModule,
    CardModule,
    TableModule,
    MultiSelectModule,
    ConfirmDialogModule,
    ChartModule,
    DropdownModule,
    ToggleButtonModule,
    DialogModule,
    ProgressSpinnerModule,
    TranslateModule,
    reportRouting],
  declarations: [ReportsComponent],
  exports: [],
  providers: [FileService, JournalCollectionService, JournalService, JournalTitleService, ConfirmationService, CounterLogSercvice, {
    provide: HighchartsStatic,
    useFactory: highchartsFactory
  }]
})

export class ReportsModule {
}
