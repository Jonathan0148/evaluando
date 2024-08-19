import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { JWT_OPTIONS, JwtHelperService, JwtInterceptor } from '@auth0/angular-jwt';
import { NotificationInterceptor } from './shared/interceptors/notification.interceptor';
import { SpinnerInterceptor } from './shared/interceptors/spinner.interceptor';
import { TooltipModule } from 'primeng/tooltip';
import { ToastrModule } from 'ngx-toastr';
import { AppLayoutModule } from './layout/app.layout.module';

@NgModule({
  declarations: [
    AppComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppLayoutModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    TooltipModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
    ToastrModule.forRoot({ positionClass: 'toast-bottom-right' }),
  ],
  providers: [
    CookieService,
    JwtHelperService,
    MessageService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    { provide: HTTP_INTERCEPTORS, useClass: NotificationInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true },
    { provide: LocationStrategy, useClass: PathLocationStrategy },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
