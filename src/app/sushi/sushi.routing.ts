import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SushiComponent} from './sushi.component';
import {SushiEditorComponent} from './sushi.editor.component';
import {CounterUploadComponent} from './counter.upload.component';

const routes: Routes = [
    { path: '', component: SushiComponent },
    { path: 'sushiprovider/:identifier', component: SushiEditorComponent },
  {path: 'counterupload', component: CounterUploadComponent}
];

export const sushiRouting: ModuleWithProviders = RouterModule.forChild(routes);
