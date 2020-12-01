import {DialogModule} from 'primeng/dialog';

import {MessageService} from 'primeng/api';
import {RouterModule} from '@angular/router';
import {TableModule} from 'primeng/table';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {TranslateModule} from '../translate/translate.module';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {DeletionComponent} from './deletion.component';
import {ebsRoutes} from './deletion.routing';
import {TranslateService} from '../translate';
import {InputTextModule} from 'primeng/inputtext';
import {MultiSelectModule} from 'primeng/multiselect';
import {InputSwitchModule} from 'primeng/inputswitch';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ToastModule} from 'primeng/toast';
import {DeletionProjectComponent} from './deletion.project.component';
import {DropdownModule} from 'primeng/dropdown';
import {FileUploadModule} from 'primeng/fileupload';
import {DeletionProjectService} from '../service/deletion.project.service';
import {InputNumberModule} from 'primeng/inputnumber';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {ProgressBarModule} from 'primeng/progressbar';

@NgModule({
  imports: [HttpClientModule,
    ToastModule,
    RouterModule,
    CommonModule,
    InputTextModule,
    FileUploadModule,
    ProgressSpinnerModule,
    ProgressBarModule,
    DropdownModule,
    FormsModule,
    TableModule,
    InputNumberModule,
    MultiSelectModule,
    InputSwitchModule,
    ConfirmDialogModule,
    DialogModule,
    TranslateModule,
    ebsRoutes],
  declarations: [DeletionComponent, DeletionProjectComponent],
  exports: [],
  providers: [DeletionProjectService, TranslateService, MessageService]
})


export class DeletionModule {
}
