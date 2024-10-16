import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextComponent } from './forms/input-text/input-text.component';
import { FunctionalMessagePipe } from './pipes/message.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeNgModule } from '../primeng.module';

@NgModule({
  declarations: [InputTextComponent, FunctionalMessagePipe],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, PrimeNgModule],
  exports: [InputTextComponent, FunctionalMessagePipe, PrimeNgModule]
})
export class SharedModule {}
