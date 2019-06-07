import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './about/about.component';
import { LayoutComponent } from './layout/layout.component';
import { AdminCpComponent } from './admin-cp/admin-cp.component';
import { ProjectsComponent } from './admin-cp/projects/projects.component';
import { ContentComponent } from './admin-cp/content/content.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminCpComponent,
    children: [
      { path: "", redirectTo: "projects", pathMatch: "full" },
      { path: "projects", component: ProjectsComponent },
      { path: "content", component: ContentComponent }
    ]
  },
  { path: 'nci', pathMatch: 'full', component: LayoutComponent },
  { path: '', pathMatch: 'full', component: LayoutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
