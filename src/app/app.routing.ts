import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

declare module '@angular/core' {
  interface ModuleWithProviders<T = any> {
    ngModule: Type<T>;
    providers?: Provider[];
  }
}
const routes: Routes = [
  {path: '', redirectTo: 'start', pathMatch: 'full'},
  {path: 'start', loadChildren: 'app/start/start.module#StartModule'},
  {path: 'reports', loadChildren: 'app/reports/reports.module#ReportsModule'},
  {path: 'counter', loadChildren: 'app/sushi/sushi.module#SushiModule'},
  {path: 'ebs', loadChildren: 'app/ebs/ebs.module#EbsModule'},
  {path: 'deletion', loadChildren: 'app/deletion/deletion.module#DeletionModule'},
  {path: 'listfilter', loadChildren: 'app/listfilter/list.filter.module#ListFilterModule'}
];

export const appRouting: ModuleWithProviders = RouterModule.forRoot(routes);
