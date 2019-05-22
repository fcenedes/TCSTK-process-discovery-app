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
import { ProcesDiscoveryChangeDatasourceDialogComponent } from './components/proces-discovery-change-datasource-dialog/proces-discovery-change-datasource-dialog.component';
import { SelectedRoleGuard } from './guards/selectedRole.guard';
import { PdCreatorSelectorComponent } from './components/pd-creator-selector/pd-creator-selector.component';
import { PdCaseComponent } from './components/pd-case/pd-case.component';
import { PdCockpitComponent } from './components/pd-cockpit/pd-cockpit.component';
import { PdDatasourceCaseSummaryComponent } from './components/pd-datasource-case-summary/pd-datasource-case-summary.component';
import { DomSanitizer } from '@angular/platform-browser';
import { PdDatasourceCaseComponent } from './components/pd-datasource-case/pd-datasource-case.component';
import { PdDatasourceCaseCockpitComponent } from './components/pd-datasource-case-cockpit/pd-datasource-case-cockpit.component';

@NgModule({
    declarations: [
        PdProcessMiningComponent,
        PdCaseViewComponent,
        PdDatasourcesAdministrationComponent,
        PdSettingsConfigurationComponent,
        PdNewDatasourceComponent,
        ProcesDiscoveryChangeDatasourceDialogComponent,
        PdCreatorSelectorComponent,
        PdCaseComponent,
        PdCockpitComponent,
        PdDatasourceCaseSummaryComponent,
        PdDatasourceCaseComponent,
        PdDatasourceCaseCockpitComponent
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
    entryComponents: [ ProcesDiscoveryChangeDatasourceDialogComponent ]
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
    }
}
