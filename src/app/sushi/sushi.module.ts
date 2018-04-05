import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {sushiRouting} from './sushi.routing';
import {SushiComponent} from './sushi.component';
import {SushiEditorComponent} from './sushi.editor.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {FileUploadModule, GrowlModule} from 'primeng/primeng';
import {FileService} from '../service/file.service';
import {JournalCollectionService} from '../service/journal.collection.service';
import {JournalService} from '../service/journal.service';
import {JournalTitleService} from '../service/journal.title.service';
import {TableModule} from "primeng/table";
import {DialogModule} from "primeng/dialog";
import {TranslateModule} from "../translate/translate.module";
import {CounterUploadComponent} from "./counter.upload.component";

@NgModule({
    imports: [HttpModule,
        RouterModule,
        CommonModule,
        FormsModule,
        FileUploadModule,
        GrowlModule,
      TableModule,
      DialogModule,
      TranslateModule,
        sushiRouting],
    declarations: [SushiComponent, SushiEditorComponent, CounterUploadComponent],
    exports: [],
    providers: [ FileService, JournalCollectionService, JournalService, JournalTitleService]
})

export class SushiModule {}
