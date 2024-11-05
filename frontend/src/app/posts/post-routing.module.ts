import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewPostComponent } from './new-post/new-post.component';
import { mustBeAuthenticatedGuard } from '../shared/guards/must-be-authenticated.guard';
import { PostListComponent } from './post-list/post-list.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { mustBeYourPostGuard } from './guards/must-be-your-post.guard';
import { PostEditComponent } from './post-edit/post-edit.component';

const routes: Routes = [
  {
    path: '',
    component: PostListComponent
  },
  {
    path: 'new',
    component: NewPostComponent,
    canActivate: [mustBeAuthenticatedGuard]
  },
  {
    path: 'edit/:id',
    component: PostEditComponent,
    canActivate: [mustBeAuthenticatedGuard, mustBeYourPostGuard]
  },
  {
    path: ':id',
    component: PostDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule {}
