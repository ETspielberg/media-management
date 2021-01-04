import {DialogModule} from 'primeng/dialog';

import {MessageService} from 'primeng/api';
import {RouterModule} from '@angular/router';
import {TableModule} from 'primeng/table';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {TranslateModule} from '../translate/translate.module';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {CheckNrwComponent} from './check.nrw.component';
import {TranslateService} from '../translate';
import {InputTextModule} from 'primeng/inputtext';
import {MultiSelectModule} from 'primeng/multiselect';
import {InputSwitchModule} from 'primeng/inputswitch';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ToastModule} from 'primeng/toast';
import {CheckNrwProjectComponent} from './check.nrw.project.component';
import {DropdownModule} from 'primeng/dropdown';
import {FileUploadModule} from 'primeng/fileupload';
import {InputNumberModule} from 'primeng/inputnumber';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {ProgressBarModule} from 'primeng/progressbar';
import {CheckNrwProjectService} from '../service/check.nrw.project.service';
import {checkNrwRoutes} from './check.nrw.routing';
import {ButtonModule} from 'primeng/button';

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
    ButtonModule,
    TableModule,
    InputNumberModule,
    MultiSelectModule,
    InputSwitchModule,
    ConfirmDialogModule,
    DialogModule,
    TranslateModule,
    checkNrwRoutes],
  declarations: [CheckNrwComponent, CheckNrwProjectComponent],
  exports: [],
  providers: [CheckNrwProjectService, TranslateService, MessageService]
})


export class CheckNrwModule {
}
