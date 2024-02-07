import { NgModule } from "@angular/core";
import { CoreModule } from "./core/core.module";
import { SharedModule } from "./shared/shared.module";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./layout/header/header.component";
import { PageLoaderComponent } from "./layout/page-loader/page-loader.component";
import { SidebarComponent } from "./layout/sidebar/sidebar.component";
import { AuthLayoutComponent } from "./layout/app-layout/auth-layout/auth-layout.component";
import { MainLayoutComponent } from "./layout/app-layout/main-layout/main-layout.component";
import { ErrorInterceptor } from "./core/interceptor/error.interceptor";
import { TokenInterceptor } from "src/app/core/interceptor/token.interceptor"
import { LocationStrategy, HashLocationStrategy } from "@angular/common";
import {
  PerfectScrollbarModule,
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface,
} from "ngx-perfect-scrollbar";
import { ClickOutsideModule } from "ng-click-outside";
import {
  HttpClientModule,
  HTTP_INTERCEPTORS,
  HttpClient,
} from "@angular/common/http";

import { LoadingBarRouterModule } from "@ngx-loading-bar/router";

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelPropagation: false,
};

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from 'src/app/authentication/core/states/login/auth.effects';
import { authReducer } from 'src/app/authentication/core/states/login/auth.reducers';
import { environment } from "src/environments/environment";
import { ManageHttpInterceptor } from "./core/interceptor/manage-http.interceptor";
import { HttpCancelService } from './core/service/http-cancel.service'
@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        PageLoaderComponent,
        SidebarComponent,
        AuthLayoutComponent,
        MainLayoutComponent,
    ],
    imports: [
        BrowserModule.withServerTransition({
          appId: 'cloudcare'
        }), 
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        PerfectScrollbarModule,
        ClickOutsideModule,
        LoadingBarRouterModule,
        CoreModule,
        SharedModule,
        EffectsModule.forRoot([AuthEffects]),
        StoreModule.forRoot({ auth: authReducer }),
        StoreDevtoolsModule.instrument({
          maxAge: 25,
          logOnly: environment.production,
        }),
    ],
    providers: [
      HttpCancelService,
      { provide: HTTP_INTERCEPTORS, useClass: ManageHttpInterceptor, multi: true },
      { provide: LocationStrategy, useClass: HashLocationStrategy },
      {
          provide: PERFECT_SCROLLBAR_CONFIG,
          useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
      },
      { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi:true },
      { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
