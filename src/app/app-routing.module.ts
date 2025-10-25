import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponent } from './pages/posts/posts.component';
import { CommentsComponent } from './pages/comments/comments.component';

const routes: Routes = [
  { path: '', redirectTo: 'home/topstories', pathMatch: 'full' }, // default redirect
  { path: 'home/:feedType', component: PostsComponent },
  { path: 'comments/:postId', component: CommentsComponent },
  { path: '**', redirectTo: 'home/topstories' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
