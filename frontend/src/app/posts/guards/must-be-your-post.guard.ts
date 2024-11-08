import { CanActivateFn } from '@angular/router';
import { PostsService } from '../services/posts.service';
import { UsersService } from 'src/app/users/service/users.service';
import { inject } from '@angular/core';
import { Post } from '../models/post';
import { UserResponse } from 'src/app/auth/models/user';
import { map, switchMap, tap } from 'rxjs/operators';

export const mustBeYourPostGuard: CanActivateFn = (route, state) => {
  const postService = inject(PostsService);
  const userService = inject(UsersService);
  const postId = route.params['id'];

  return userService.$currentUser.pipe(
    switchMap((user: UserResponse) => {
      return postService.getPostDetail(postId).pipe(
        map((post: Post) => {
          route.data = post;
          return post.user.id === user.id;
        })
      );
    })
  );
};
