import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './about/about.component';
import { LayoutComponent } from './layout/layout.component';
import { AdminCpComponent } from './admin-cp/admin-cp.component';

const routes: Routes = [
  { path: 'admin', component: AdminCpComponent },
  { path: '', pathMatch: 'full', component: LayoutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
