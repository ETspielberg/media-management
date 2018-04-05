import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CollectionManagementComponent} from './collection.management.component';

const routes: Routes = [
  { path: '', component: CollectionManagementComponent}
];

export const jkbRouting: ModuleWithProviders = RouterModule.forChild(routes);
