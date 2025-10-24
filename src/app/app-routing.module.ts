import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponent } from './pages/posts/posts.component';
import { CommentsComponent } from './pages/comments/comments.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // default redirect
  { path: 'home', component: PostsComponent },
  { path: 'comments/:postId', component: CommentsComponent },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
