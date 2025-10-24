import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageLayoutComponent } from './components/page-layout/page-layout.component';

const routes: Routes = [
  {
    path: 'home',
    component: PageLayoutComponent,
    children: [{ path: '', redirectTo: 'story', pathMatch: 'full' }],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
