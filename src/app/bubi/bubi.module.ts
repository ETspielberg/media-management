import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TranslateService} from '../translate';
import {MessageService} from 'primeng/api';
import {BubiComponent} from './bubi.component';
import {BubiService} from '../service/bubi.service';
import {bubiRoutes} from './bubi.routing';
import {FileUploadModule} from 'primeng/fileupload';
import {TranslateModule} from '../translate/translate.module';
import {BubiCoredataComponent} from './bubi.coredata.component';
import {TableModule} from 'primeng/table';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {InputNumberModule} from 'primeng/inputnumber';
import {FormsModule} from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown';
import {CheckboxModule} from 'primeng/checkbox';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {BubiDataComponent} from './bubi.data.component';
import {BubiOrderlineComponent} from './bubi.orderline. component';
import {BubiOrderlineNewComponent} from './bubi.orderline.new.component';
import {InputSwitchModule} from 'primeng/inputswitch';

@NgModule({
  declarations: [BubiComponent, BubiCoredataComponent, BubiDataComponent, BubiOrderlineComponent, BubiOrderlineNewComponent],
  imports: [
    CommonModule,
    FileUploadModule,
    TableModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    CheckboxModule,
    InputSwitchModule,
    InputNumberModule,
    InputTextModule,
    InputTextareaModule,
    TranslateModule,
    bubiRoutes,
    FormsModule
  ],
  providers: [BubiService, TranslateService, MessageService]
})
export class BubiModule { }
