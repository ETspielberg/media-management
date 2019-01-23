import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {appRouting} from './app.routing';
import {CommonModule, DecimalPipe} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {FileService} from './service/file.service';
import {JournalCollectionService} from './service/journal.collection.service';
import {JournalService} from './service/journal.service';
import {JournalTitleService} from './service/journal.title.service';
import {HttpClientModule} from '@angular/common/http';
import {DataService} from './service/data.service';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateModule} from './translate/translate.module';
import {ButtonModule, DialogModule, InputTextModule, SpinnerModule} from 'primeng/primeng';
import {TableModule} from 'primeng/table';
import {AuthentificationService} from './service/authentification.service';


@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule,
    CommonModule,
    ButtonModule,
    DialogModule,
    FormsModule,
    TranslateModule,
    TableModule,
    InputTextModule,
    SpinnerModule,
    appRouting],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  exports: [],
  providers: [DecimalPipe, FileService, JournalCollectionService, JournalService, JournalTitleService, DataService, AuthentificationService]
})

export class AppModule {
}
