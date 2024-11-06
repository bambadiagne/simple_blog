import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextComponent } from './forms/input-text/input-text.component';
import { FunctionalMessagePipe } from './pipes/message.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeNgModule } from '../primeng.module';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { MessageComponent } from './components/message/message.component';
import { TextEditorComponent } from './forms/text-editor/text-editor.component';
import { UploadFileComponent } from './forms/upload-file/upload-file.component';

@NgModule({
  declarations: [InputTextComponent, SpinnerComponent, MessageComponent, TextEditorComponent, UploadFileComponent, FunctionalMessagePipe],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, PrimeNgModule],
  exports: [InputTextComponent, SpinnerComponent, MessageComponent, TextEditorComponent, UploadFileComponent, FunctionalMessagePipe, PrimeNgModule]
})
export class SharedModule {}
