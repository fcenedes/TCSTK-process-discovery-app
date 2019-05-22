import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { StarterAppComponent } from './routes/starter-app/starter-app.component';
import { HomeComponent } from './routes/home/home.component';
import { CaseComponent } from './routes/case/case.component';
import { ConfigurationComponent } from './routes/configuration/configuration.component';
import { TcCoreLibModule, LogService } from '@tibco-tcstk/tc-core-lib';
import { TcLiveappsLibModule } from '@tibco-tcstk/tc-liveapps-lib';
import { AppRoutingModule } from './app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TcFormsLibModule } from '@tibco-tcstk/tc-forms-lib';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule, MatExpansionModule, MatButtonModule } from '@angular/material';
import { TcProcessDiscoveryLibModule } from '@tibco-tcstk/tc-process-discovery-lib';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        StarterAppComponent,
        HomeComponent,
        CaseComponent,
        ConfigurationComponent
    ],
    imports: [
        AppRoutingModule,
        TcCoreLibModule,
        TcFormsLibModule,
        TcLiveappsLibModule,
        FlexLayoutModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        TcProcessDiscoveryLibModule
    ],
    providers: [ LogService ],
    bootstrap: [AppComponent]
})
export class AppModule { }
