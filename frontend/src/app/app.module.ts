import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { PrimeNgModule } from './primeng.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from './auth/auth.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';
import { PostsModule } from './posts/posts.module';
import { CustomPageTitleStrategy } from './shared/strategies/custom-title.strategy';
import { TitleStrategy } from '@angular/router';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    AuthModule,
    PostsModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  exports: [PrimeNgModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: TitleStrategy, useClass: CustomPageTitleStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
