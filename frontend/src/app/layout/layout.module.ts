import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { PrimeNgModule } from '../primeng.module';
import { HomeComponent } from './home/home.component';
@NgModule({
  declarations: [NavBarComponent, HomeComponent],
  imports: [CommonModule, PrimeNgModule],
  exports: [NavBarComponent, HomeComponent]
})
export class LayoutModule {}
