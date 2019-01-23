import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SushiComponent} from './sushi.component';
import {CounterUploadComponent} from './counter.upload.component';

const routes: Routes = [
    { path: '', component: SushiComponent },
  {path: 'counterupload', component: CounterUploadComponent}
];

export const sushiRouting: ModuleWithProviders = RouterModule.forChild(routes);
