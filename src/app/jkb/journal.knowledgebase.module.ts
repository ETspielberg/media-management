import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {CommonModule, DecimalPipe} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {FileUploadModule} from 'primeng/fileupload';
import {FileService} from '../service/file.service';
import {JournalCollectionService} from '../service/journal.collection.service';
import {JournalService} from '../service/journal.service';
import {JournalTitleService} from '../service/journal.title.service';
import {TableModule} from 'primeng/table';
import {DialogModule} from 'primeng/dialog';
import {TranslateModule} from '../translate/translate.module';
import {jkbRouting} from './journal.knowledgebase.routing';
import {CollectionManagementComponent} from './collection.management.component';

@NgModule({
  imports: [HttpModule,
    RouterModule,
    CommonModule,
    FormsModule,
    FileUploadModule,
    TableModule,
    DialogModule,
    TranslateModule,
    jkbRouting],
  declarations: [CollectionManagementComponent],
  exports: [],
  providers: [ FileService, JournalCollectionService, JournalService, JournalTitleService]
})

export class JournalKnowledgebaseModule {}
