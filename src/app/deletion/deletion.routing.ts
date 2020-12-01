import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DeletionComponent} from './deletion.component';
import {DeletionProjectComponent} from './deletion.project.component';

const routes: Routes = [
  {path: '', redirectTo: 'start', pathMatch: 'full'},
  { path: 'start', component: DeletionComponent},
  { path: 'projects/:project_id', component: DeletionProjectComponent}
];

export const ebsRoutes: ModuleWithProviders = RouterModule.forChild(routes);
