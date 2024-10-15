import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit {
  items: MenuItem[] | undefined;
  profileItem = [
    {
      label: 'Profile',
      items: [
        {
          label: 'My profile',
          icon: 'pi pi-user'
        },
        {
          label: 'My posts',
          icon: 'pi pi-server'
        },
        {
          label: 'Logout',
          icon: 'pi pi-sign-out'
        },
        {
          separator: true
        }
      ]
    }
  ];
  constructor() {}
  ngOnInit() {
    this.items = [
      {
        label: 'Home'
      },
      {
        label: 'Posts'
      },

      {
        label: 'Contact'
      }
    ];
  }
}
