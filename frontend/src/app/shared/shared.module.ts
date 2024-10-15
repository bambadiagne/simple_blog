import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextComponent } from './forms/input-text/input-text.component';
import { FunctionalMessagePipe } from './pipes/message.pipe';

@NgModule({
  declarations: [InputTextComponent, FunctionalMessagePipe],
  imports: [CommonModule],
  exports: [InputTextComponent, FunctionalMessagePipe]
})
export class SharedModule {}
