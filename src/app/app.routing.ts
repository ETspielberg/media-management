import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

declare module "@angular/core" {
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
  {path: 'shibboleth', loadChildren: 'app/shibboleth/shibboleth.module#ShibbolethModule'},
  {path: 'jkb', loadChildren: 'app/jkb/journal.knowledgebase.module#JournalKnowledgebaseModule'}
];

export const appRouting: ModuleWithProviders = RouterModule.forRoot(routes);
