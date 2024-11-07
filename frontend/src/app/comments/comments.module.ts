import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { CommentsListComponent } from './comments-list/comments-list.component';

@NgModule({
  declarations: [CommentsListComponent],
  imports: [CommonModule, SharedModule],
  exports: [CommentsListComponent]
})
export class CommentsModule {}
