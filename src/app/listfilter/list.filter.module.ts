import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {listFilterRouting} from './list.filter.routing';
import {ListFilterComponent} from './list.filter.component';
import {ListFilterEditorComponent} from './list.filter.editor.component';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import {ToastModule} from 'primeng/toast';
import {FormsModule} from '@angular/forms';
import {TranslateModule} from '../translate/translate.module';
import {ButtonModule} from 'primeng/button';
import {ListfilterService} from '../service/listfilter.service';
import {FileUploadModule} from 'primeng/fileupload';
import {MessageService} from 'primeng/api';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    DropdownModule,
    ToastModule,
    DropdownModule,
    FormsModule,
    TranslateModule,
    InputTextModule,
    FileUploadModule,
    listFilterRouting,
    ButtonModule
  ],
  declarations: [ListFilterComponent, ListFilterEditorComponent],
  exports: [ListFilterComponent, ListFilterEditorComponent],
  providers: [ListfilterService, MessageService]
})

export class ListFilterModule {
}
