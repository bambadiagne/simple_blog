import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextComponent } from './forms/input-text/input-text.component';
import { FunctionalMessagePipe } from './pipes/message.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeNgModule } from '../primeng.module';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { MessageComponent } from './components/message/message.component';

@NgModule({
  declarations: [InputTextComponent, SpinnerComponent, MessageComponent, FunctionalMessagePipe],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, PrimeNgModule],
  exports: [InputTextComponent, SpinnerComponent, MessageComponent, FunctionalMessagePipe, PrimeNgModule]
})
export class SharedModule {}
