import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { StarterAppComponent } from './routes/starter-app/starter-app.component';
import { HomeComponent } from './routes/home/home.component';
import { CaseComponent } from './routes/case/case.component';
import { SplashComponent } from './routes/splash/splash.component';
import { ConfigurationComponent } from './routes/configuration/configuration.component';
import { TcCoreLibModule, LogService, TcCoreConfig, SessionRefreshService, TcCoreConfigService, ProxyInterceptor, OAuthInterceptor } from '@tibco-tcstk/tc-core-lib';
import { TcLiveappsLibModule } from '@tibco-tcstk/tc-liveapps-lib';
import { AppRoutingModule } from './app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TcFormsLibModule } from '@tibco-tcstk/tc-forms-lib';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule, MatExpansionModule, MatButtonModule } from '@angular/material';
import { TcProcessDiscoveryLibModule } from '@tibco-tcstk/tc-process-discovery-lib';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/** This is the tc core configuration object
 * To use oauth you must also add the OAuthInterceptor to providers
 *  Note: Only HTTP calls that start with / will have oAuth token attached
 * To use proxy you must also add the ProxyInterceptor to providers
 *  Note: Only HTTP calls that start with / will be proxied
 */
const tcCoreConfig: TcCoreConfig = {
    oAuthLocalStorageKey: '',
    proxy_url: '',
    api_key: '',
    api_key_param: 'api_key',
    proxy_liveapps_path: '',
    proxy_tce_path: '',
    enable_tce: false
}

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        StarterAppComponent,
        HomeComponent,
        CaseComponent,
        SplashComponent,
        ConfigurationComponent
    ],
    imports: [
        AppRoutingModule,
        TcCoreLibModule.forRoot(tcCoreConfig),
        TcFormsLibModule,
        TcLiveappsLibModule,
        FlexLayoutModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        TcProcessDiscoveryLibModule
    ],
    providers: [
        LogService,
        // for proxied API calls
        // { provide: HTTP_INTERCEPTORS, useClass: ProxyInterceptor, multi: true },

        // for using oAuth
        // { provide: HTTP_INTERCEPTORS, useClass: OAuthInterceptor, multi: true }
    ],
    bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
    constructor(public sessionRefreshService: SessionRefreshService, public tcConfigService: TcCoreConfigService) {
        if (!tcConfigService.getConfig().oAuthLocalStorageKey) {
            // setup cookie refresh for every 10 minutes
            // note: if oauth in use then no need since key will be refreshed in local storage by session manager app
            const usingProxy = (this.tcConfigService.getConfig().proxy_url && this.tcConfigService.getConfig().proxy_url !== '') ? true : false;
            this.sessionRefreshService.scheduleCookieRefresh(600000, usingProxy);
        }
    }
}
