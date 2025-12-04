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
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { InputOtpComponent } from './forms/input-otp/input-otp.component';
import { GoogleAuthComponent } from './forms/google-auth/google-auth';

@NgModule({
  declarations: [InputTextComponent, SpinnerComponent, MessageComponent, TextEditorComponent, UploadFileComponent, FunctionalMessagePipe, SafeHtmlPipe, InputOtpComponent,GoogleAuthComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, PrimeNgModule],
  exports: [InputTextComponent, SpinnerComponent, MessageComponent, TextEditorComponent, UploadFileComponent, FunctionalMessagePipe, PrimeNgModule, SafeHtmlPipe, InputOtpComponent,GoogleAuthComponent]
})
export class SharedModule {}
