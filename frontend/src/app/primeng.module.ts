import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu';
import { RippleModule } from 'primeng/ripple';
@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [ButtonModule, InputTextModule, TableModule, DropdownModule, CalendarModule, DialogModule, MenubarModule, BadgeModule, AvatarModule, RippleModule, MenuModule]
})
export class PrimeNgModule {}
