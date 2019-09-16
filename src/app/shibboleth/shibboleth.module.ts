import {DialogModule} from 'primeng/dialog';
import {
  ConfirmDialogModule, InputSwitchModule, InputTextModule, MultiSelectModule,
} from 'primeng/primeng';
import {ConfirmationService} from 'primeng/api';
import {RouterModule} from '@angular/router';
import {TableModule} from 'primeng/table';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {TranslateModule} from '../translate/translate.module';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ShibbolethDataService} from '../service/shibboleth.data.service';
import {ShibbolethComponent} from './shibboleth.component';
import {GrowlModule} from 'primeng/growl';
import {shibbolethRoutes} from './shibboleth.routing';
import {TranslateService} from '../translate';

@NgModule({
  imports: [HttpClientModule,
    RouterModule,
    CommonModule,
    InputTextModule,
    FormsModule,
    GrowlModule,
    TableModule,
    MultiSelectModule,
    InputSwitchModule,
    ConfirmDialogModule,
    DialogModule,
    TranslateModule,
    shibbolethRoutes],
  declarations: [ShibbolethComponent],
  exports: [],
  providers: [ShibbolethDataService, ConfirmationService, TranslateService]
})

export class ShibbolethModule {
}
