import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { MenubarModule } from 'primeng/menubar';
import { AvatarModule } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu';
import { RippleModule } from 'primeng/ripple';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessagesModule } from 'primeng/messages';
@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [ButtonModule, InputTextModule, TableModule, DropdownModule, CalendarModule, MessagesModule, MenubarModule, AvatarModule, RippleModule, MenuModule, InputGroupModule, InputGroupAddonModule, ProgressSpinnerModule]
})
export class PrimeNgModule {}
