import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CheckNrwComponent} from './check.nrw.component';
import {CheckNrwProjectComponent} from './check.nrw.project.component';

const routes: Routes = [
  {path: '', redirectTo: 'start', pathMatch: 'full'},
  { path: 'start', component: CheckNrwComponent},
  { path: 'projects/:project_id', component: CheckNrwProjectComponent}
];

export const checkNrwRoutes: ModuleWithProviders = RouterModule.forChild(routes);
