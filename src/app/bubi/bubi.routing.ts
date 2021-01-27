import {RouterModule, Routes} from '@angular/router';
import {BubiComponent} from './bubi.component';
import {ModuleWithProviders} from '@angular/core';
import {BubiCoredataComponent} from './bubi.coredata.component';
import {BubiDataComponent} from './bubi.data.component';
import {BubiOrderlineComponent} from './bubi.orderline.component';
import {BubiOrderlineOverviewComponent} from './bubi.orderline.overview.component';
import {BubiOrderComponent} from './bubi.order.component';

const routes: Routes = [
  {path: '', redirectTo: 'start', pathMatch: 'full'},
  { path: 'start', component: BubiComponent},
  { path: 'coredata', component: BubiCoredataComponent},
  { path: 'data', component: BubiDataComponent},
  { path: 'orderline', component: BubiOrderlineComponent},
  { path: 'orderlines', component: BubiOrderlineOverviewComponent},
  { path: 'order', component: BubiOrderComponent}
  ];

export const bubiRoutes: ModuleWithProviders = RouterModule.forChild(routes);
