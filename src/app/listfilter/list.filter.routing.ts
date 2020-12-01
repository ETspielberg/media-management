import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListFilterComponent} from './list.filter.component';
import {ListFilterEditorComponent} from './list.filter.editor.component';

const routes: Routes = [
  { path: '', component: ListFilterComponent},
  { path: 'filter/:filter_id', component: ListFilterEditorComponent}
];

export const listFilterRouting: ModuleWithProviders = RouterModule.forChild(routes);
