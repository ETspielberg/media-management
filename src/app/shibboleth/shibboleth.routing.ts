import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ShibbolethComponent} from './shibboleth.component';

const routes: Routes = [
  { path: '', component: ShibbolethComponent }
];

export const shibbolethRoutes: ModuleWithProviders = RouterModule.forChild(routes);
