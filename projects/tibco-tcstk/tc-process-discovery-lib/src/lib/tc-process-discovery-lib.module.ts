import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TcCoreLibModule } from '@tibco-tcstk/tc-core-lib';
import { TcLiveappsLibModule } from '@tibco-tcstk/tc-liveapps-lib';
import {
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule, 
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule,
    MatListModule, MatMenuModule, MatOptionModule, MatSelectModule, MatTabsModule, MatTooltipModule, MatButtonToggleModule, MatExpansionModule, MatTableModule, MatStepperModule, MatRadioModule, MatSnackBarModule, MatSlideToggleModule, MatProgressBarModule, MatIconRegistry
} from '@angular/material';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ColorPickerModule } from 'ngx-color-picker';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { PdProcessMiningComponent } from './components/pd-process-mining/pd-process-mining.component';
import { CommonModule } from '@angular/common';

import { PdCaseViewComponent } from './components/pd-case-view/pd-case-view.component';
import { PdDatasourcesAdministrationComponent } from './components/pd-datasources-administration/pd-datasources-administration.component';
import { TcSpotfireLibModule } from '@tibco-tcstk/tc-spotfire-lib';
import { PdSettingsConfigurationComponent } from './components/pd-settings-configuration/pd-settings-configuration.component';
import { PdNewDatasourceComponent } from './components/pd-new-datasource/pd-new-datasource.component';
import { SelectedRoleGuard } from './guards/selectedRole.guard';
import { PdCreatorSelectorComponent } from './components/pd-creator-selector/pd-creator-selector.component';
import { PdCaseComponent } from './components/pd-case/pd-case.component';
import { PdCockpitComponent } from './components/pd-cockpit/pd-cockpit.component';
import { PdDatasourceCaseSummaryComponent } from './components/pd-datasource-case-summary/pd-datasource-case-summary.component';
import { DomSanitizer } from '@angular/platform-browser';
import { PdDatasourceCaseComponent } from './components/pd-datasource-case/pd-datasource-case.component';
import { PdDatasourceCaseCockpitComponent } from './components/pd-datasource-case-cockpit/pd-datasource-case-cockpit.component';
import { PdCaseSummaryComponent } from './components/pd-case-summary/pd-case-summary.component';
import { PdFavoriteCasesComponent } from './components/pd-favorite-cases/pd-favorite-cases.component';
import { PdRecentCasesComponent } from './components/pd-recent-cases/pd-recent-cases.component';

@NgModule({
    declarations: [
        PdProcessMiningComponent,
        PdCaseViewComponent,
        PdDatasourcesAdministrationComponent,
        PdSettingsConfigurationComponent,
        PdNewDatasourceComponent,
        PdCreatorSelectorComponent,
        PdCaseComponent,
        PdCockpitComponent,
        PdDatasourceCaseSummaryComponent,
        PdDatasourceCaseComponent,
        PdDatasourceCaseCockpitComponent,
        PdCaseSummaryComponent,
        PdFavoriteCasesComponent,
        PdRecentCasesComponent
    ],
    imports: [
        CommonModule,
        MatIconModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatListModule,
        MatFormFieldModule,
        MatInputModule,
        MatToolbarModule,
        MatIconModule,
        MatSelectModule,
        MatOptionModule,
        MatDialogModule,
        MatMenuModule,
        MatCardModule,
        MatTooltipModule,
        MatTabsModule,
        MatButtonToggleModule,
        MatExpansionModule,
        MatTableModule,
        MatStepperModule,
        DragDropModule,
        MatRadioModule,
        MatSnackBarModule,
        MatSlideToggleModule,
        MatProgressBarModule,
        FormsModule,
        FlexLayoutModule,
        ColorPickerModule,
        ScrollingModule,
        ReactiveFormsModule,
        TcLiveappsLibModule,
        TcCoreLibModule,
        TcSpotfireLibModule,
        RouterModule
    ],
    providers: [ SelectedRoleGuard ],
    exports: [ ],
    entryComponents: [ ]
})
export class TcProcessDiscoveryLibModule { 

    constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
        this.matIconRegistry.addSvgIconLiteral(
            'pd-investigate-icon',
            this.domSanitizer.bypassSecurityTrustHtml(
                '<svg xmlns="http://www.w3.org/2000/svg" width = "24" height = "24" viewBox = "0 0 24 24">\n' +
                '<g fill="none" fill - rule="evenodd">\n' +
                '<circle cx="12" cy = "12" r = "10" fill = "#04BE5B" stroke = "#04BE5B" stroke - width="4"/>\n' +
                '</g>\n' +
                '</svg>\n'
            )
        );

        this.matIconRegistry.addSvgIconLiteral(
            'pd-database-blue-icon',
            this.domSanitizer.bypassSecurityTrustHtml(
                '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24">\n' +
                '<defs>\n' +
                '<style>\n' +
                '.cls-1 {\n' +
                'fill: none;\n' +
                'cli-rule: evenodd;\n' +
                '}\n' +
                '.cls-2 {\n' +
                'clip-path: url(#clip-path);\n' +
                '}\n' +
                '.cls-3 {\n' +
                'clip-path: url(#clip-path-2);\n' +
                '}\n' +
                '.cls-4 {\n' +
                'fill: #0081cb;\n' +
                '}\n' +
                '</style>\n' +
                '<clipPath id="clip-path" >\n' +
                '<path class="cls-1" d="M-284,390.5h-12a2.49,2.49,0,0,1-1.76-.73,2.49,2.49,0,0,1-.73-1.76V376a2.49,2.49,0,0,1,.73-1.76,2.49,2.49,0,0,1,1.76-.73h12a2.49,2.49,0,0,1,1.76.73,2.49,2.49,0,0,1,.73,1.76v12a2.49,2.49,0,0,1-.73,1.76A2.49,2.49,0,0,1-284,390.5Z" />\n' +
                '</clipPath>\n' +
                '<clipPath id="clip-path-2">\n' +
                '<path class="cls-1" d="M-298,376a2,2,0,0,1,2-2h12a2,2,0,0,1,2,2v12a2,2,0,0,1-2,2h-12a2,2,0,0,1-2-2Zm-10-12h36v36h-36Z" />\n' +
                '</clipPath>\n' +
                '</defs>\n' +
                '<title>ic-database-blue</title>\n' +
                '<g>\n' +
                '<ellipse class="cls-4" cx="12" cy="5" rx="9" ry="3"/>\n' +
                '<path class="cls-4" d="M12,10C7,10,3,8.66,3,7v5c0,1.66,4,3,9,3s9-1.34,9-3V7C21,8.66,17,10,12,10Z"/>\n' +
                '<path class="cls-4" d="M12,17c-5,0-9-1.34-9-3v5c0,1.66,4,3,9,3s9-1.34,9-3V14C21,15.66,17,17,12,17Z"/>\n' +
                '</g>\n' +
                '</svg>'
            )
        )
    }
}
