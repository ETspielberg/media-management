import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EbsComponent} from './ebs.component';
import {EbsProjectComponent} from './ebs.project.component';

const routes: Routes = [
  {path: '', redirectTo: 'start', pathMatch: 'full'},
  { path: 'start', component: EbsComponent},
  { path: 'project/:project_id', component: EbsProjectComponent
  }
];

export const ebsRoutes: ModuleWithProviders = RouterModule.forChild(routes);
