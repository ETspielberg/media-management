import {DialogModule} from 'primeng/dialog';

import {ConfirmationService, MessageService} from 'primeng/api';
import {RouterModule} from '@angular/router';
import {TableModule} from 'primeng/table';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {TranslateModule} from '../translate/translate.module';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ShibbolethDataService} from '../service/shibboleth.data.service';
import {ShibbolethComponent} from './shibboleth.component';
import {shibbolethRoutes} from './shibboleth.routing';
import {TranslateService} from '../translate';
import {InputTextModule} from 'primeng/inputtext';
import {MultiSelectModule} from 'primeng/multiselect';
import {InputSwitchModule} from 'primeng/inputswitch';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ToastModule} from 'primeng/toast';

@NgModule({
  imports: [HttpClientModule,
    ToastModule,
    RouterModule,
    CommonModule,
    InputTextModule,
    FormsModule,
    TableModule,
    MultiSelectModule,
    InputSwitchModule,
    ConfirmDialogModule,
    DialogModule,
    TranslateModule,
    shibbolethRoutes],
  declarations: [ShibbolethComponent],
  exports: [],
  providers: [ShibbolethDataService, ConfirmationService, TranslateService, MessageService]
})

export class ShibbolethModule {
}
