import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {StartComponent} from './start.component';
import {startRouting} from './start.routing';
import {CommonModule} from '@angular/common';
import {FileUploadModule, GrowlModule} from 'primeng/primeng';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    FileUploadModule,
    GrowlModule,
    startRouting],
  declarations: [StartComponent],
  exports: [StartComponent],
  providers: []
})

export class StartModule {}

