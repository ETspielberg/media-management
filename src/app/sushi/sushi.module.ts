import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {sushiRouting} from './sushi.routing';
import {SushiComponent} from './sushi.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {
  ConfirmDialogModule, FileUploadModule, GrowlModule, InputTextModule, MultiSelectModule,
  ProgressSpinnerModule
} from 'primeng/primeng';
import {FileService} from '../service/file.service';
import {JournalCollectionService} from '../service/journal.collection.service';
import {JournalService} from '../service/journal.service';
import {JournalTitleService} from '../service/journal.title.service';
import {TableModule} from 'primeng/table';
import {DialogModule} from 'primeng/dialog';
import {TranslateModule} from '../translate/translate.module';
import {CounterUploadComponent} from './counter.upload.component';
import {HttpClientModule} from '@angular/common/http';
import {ConfirmationService} from 'primeng/api';
import {CounterLogSercvice} from '../service/counter.log.sercvice';

@NgModule({
  imports: [HttpClientModule,
    RouterModule,
    CommonModule,
    InputTextModule,
    FormsModule,
    FileUploadModule,
    GrowlModule,
    TableModule,
    MultiSelectModule,
    ConfirmDialogModule,
    DialogModule,
    ProgressSpinnerModule,
    TranslateModule,
    sushiRouting],
  declarations: [SushiComponent, CounterUploadComponent],
  exports: [],
  providers: [FileService, JournalCollectionService, JournalService, JournalTitleService, ConfirmationService, CounterLogSercvice]
})

export class SushiModule {
}