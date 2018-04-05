import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from './app.component';
import {SushiComponent} from './sushi/sushi.component';
import {SushiEditorComponent} from './sushi/sushi.editor.component';
import {CollectionManagementComponent} from './jkb/collection.management.component';

const routes: Routes = [
    { path : '', redirectTo: 'start', pathMatch: 'full'},
    { path : 'start', loadChildren : 'app/start/start.module#StartModule'},
    { path: 'counter', loadChildren: 'app/sushi/sushi.module#SushiModule' },
  { path: 'jkb', loadChildren: 'app/jkb/journal.knowledgebase.module#JournalKnowledgebaseModule'}
];

export const appRouting: ModuleWithProviders = RouterModule.forRoot(routes);
