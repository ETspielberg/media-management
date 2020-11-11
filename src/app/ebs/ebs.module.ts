import {DialogModule} from 'primeng/dialog';

import {MessageService} from 'primeng/api';
import {RouterModule} from '@angular/router';
import {TableModule} from 'primeng/table';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {TranslateModule} from '../translate/translate.module';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {EbsComponent} from './ebs.component';
import {ebsRoutes} from './ebs.routing';
import {TranslateService} from '../translate';
import {InputTextModule} from 'primeng/inputtext';
import {MultiSelectModule} from 'primeng/multiselect';
import {InputSwitchModule} from 'primeng/inputswitch';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ToastModule} from 'primeng/toast';
import {EbsProjectComponent} from './ebs.project.component';
import {DropdownModule} from 'primeng/dropdown';
import {EbsProjectService} from '../service/ebs.project.service';
import {FileUploadModule} from 'primeng/fileupload';

@NgModule({
  imports: [HttpClientModule,
    ToastModule,
    RouterModule,
    CommonModule,
    InputTextModule,
    FileUploadModule,
    DropdownModule,
    FormsModule,
    TableModule,
    MultiSelectModule,
    InputSwitchModule,
    ConfirmDialogModule,
    DialogModule,
    TranslateModule,
    ebsRoutes],
  declarations: [EbsComponent, EbsProjectComponent],
  exports: [],
  providers: [EbsProjectService, TranslateService, MessageService]
})


export class EbsModule {
}
