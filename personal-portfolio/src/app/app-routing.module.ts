import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArtComponent } from './art/art.component';
import { WorkComponent } from './work/work.component';

const routes: Routes = [
  { path: 'work', component: WorkComponent },
  { path: 'art', component: ArtComponent },
  { path: '',   redirectTo: '/work', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
