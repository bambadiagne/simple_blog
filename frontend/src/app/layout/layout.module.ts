import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { PrimeNgModule } from '../primeng.module';
import { HomeComponent } from './home/home.component';
import { PostsModule } from '../posts/posts.module';
import { SharedModule } from '../shared/shared.module';
import { FooterComponent } from './footer/footer.component';
@NgModule({
  declarations: [NavBarComponent, HomeComponent, FooterComponent],
  imports: [CommonModule, PrimeNgModule, SharedModule, PostsModule],
  exports: [NavBarComponent, HomeComponent, FooterComponent]
})
export class LayoutModule {}
