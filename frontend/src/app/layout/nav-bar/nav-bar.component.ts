import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { UserResponse } from 'src/app/auth/models/user';
import { UsersService } from 'src/app/users/service/users.service';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit, OnDestroy {
  items: MenuItem[] | undefined;
  user: any = null;
  private _destroy$ = new Subject<void>();
  profileItem = [
    {
      label: 'Profile',
      items: [
        {
          label: 'My profile',
          icon: 'pi pi-user'
        },
        {
          label: 'New Post',
          icon: 'pi pi-pen-to-square',
          command: () => {
            this.router.navigate(['/posts/new']);
          }
        },
        {
          label: 'My Posts',
          icon: 'pi pi-list',
          command: () => {
            this.router.navigate(['/posts/my-posts']);
          }
        },
        {
          label: 'Logout',
          icon: 'pi pi-sign-out',
          command: () => {
            this.usersService.logout().pipe(takeUntil(this._destroy$)).subscribe();
            this.router.navigate(['/']);
          }
        },
        {
          separator: true
        }
      ]
    }
  ];
  constructor(
    private usersService: UsersService,
    private router: Router
  ) {
    this.usersService.getCurrentUser().pipe(takeUntil(this._destroy$)).subscribe();
  }
  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        command: () => {
          this.router.navigate(['/']);
        }
      },
      {
        label: 'Posts',
        command: () => {
          this.router.navigate(['/posts']);
        }
      },

      {
        label: 'Contact'
      }
    ];
    this.usersService.$currentUser.subscribe((user: UserResponse) => {
      this.user = user;
    });
  }
}
