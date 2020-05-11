import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
import { MatTreeModule } from '@angular/material/tree';

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
import { SelectedRoleGuard } from './guards/selectedRole.guard';
import { PdCaseComponent } from './components/pd-case/pd-case.component';
import { PdCockpitComponent } from './components/pd-cockpit/pd-cockpit.component';
import { PdDatasourceCaseSummaryComponent } from './components/pd-datasource-case-summary/pd-datasource-case-summary.component';
import { DomSanitizer } from '@angular/platform-browser';
import { PdDatasourceCaseComponent } from './components/pd-datasource-case/pd-datasource-case.component';
import { PdDatasourceCaseCockpitComponent } from './components/pd-datasource-case-cockpit/pd-datasource-case-cockpit.component';
import { PdCaseSummaryComponent } from './components/pd-case-summary/pd-case-summary.component';
import { PdFavoriteCasesComponent } from './components/pd-favorite-cases/pd-favorite-cases.component';
import { PdRecentCasesComponent } from './components/pd-recent-cases/pd-recent-cases.component';
import { PdCaseCockpitComponent } from './components/pd-case-cockpit/pd-case-cockpit.component';
import { PdFileManagementComponent } from './components/pd-file-management/pd-file-management.component';
import { PdNewBusinessProcessComponent } from './components/pd-new-business-process/pd-new-business-process.component';
import { PdNewBusinessProcessSourceSelectionComponent } from './components/pd-new-business-process-source-selection/pd-new-business-process-source-selection.component';
import { PdNewBusinessProcessParsingComponent } from './components/pd-new-business-process-parsing/pd-new-business-process-parsing.component';
import { PdNewBusinessProcessMappingComponent } from './components/pd-new-business-process-mapping/pd-new-business-process-mapping.component';
import { PdNewBusinessProcessOtherOptionsComponent } from './components/pd-new-business-process-other-options/pd-new-business-process-other-options.component';
import { PdNewBusinessProcessConfirmationComponent } from './components/pd-new-business-process-confirmation/pd-new-business-process-confirmation.component';
import { PdNewBusinessProcessGroupingComponent } from './components/pd-new-business-process-grouping/pd-new-business-process-grouping.component';
import { PdNewDatasourceTDVComponent } from './components/pd-new-datasource-tdv/pd-new-datasource-tdv.component';
import { PdSettingsTdvComponent } from './components/pd-settings-tdv/pd-settings-tdv.component';
import { PdNewDatasourceFileComponent } from './components/pd-new-datasource-file/pd-new-datasource-file.component';
import { PdBusinessProcessesComponent } from './components/pd-business-processes/pd-business-processes.component';
import { PdListDocumentsComponent } from './components/pd-list-documents/pd-list-documents.component';
import { PdDataPreviewComponent } from './components/pd-data-preview/pd-data-preview.component';
import { PdNewBusinessProcessGeneralInformationComponent } from './components/pd-new-business-process-general-information/pd-new-business-process-general-information.component';

@NgModule({
  declarations: [
    PdProcessMiningComponent,
    PdCaseViewComponent,
    PdDatasourcesAdministrationComponent,
    PdSettingsConfigurationComponent,
    PdCaseComponent,
    PdCockpitComponent,
    PdDatasourceCaseSummaryComponent,
    PdDatasourceCaseComponent,
    PdDatasourceCaseCockpitComponent,
    PdCaseSummaryComponent,
    PdFavoriteCasesComponent,
    PdRecentCasesComponent,
    PdCaseCockpitComponent,
    PdFileManagementComponent,
    PdNewBusinessProcessComponent,
    PdNewBusinessProcessSourceSelectionComponent,
    PdNewBusinessProcessParsingComponent,
    PdNewBusinessProcessMappingComponent,
    PdNewBusinessProcessOtherOptionsComponent,
    PdNewBusinessProcessConfirmationComponent,
    PdNewBusinessProcessGroupingComponent,
    PdNewDatasourceTDVComponent,
    PdSettingsTdvComponent,
    PdNewDatasourceFileComponent,
    PdBusinessProcessesComponent,
    PdListDocumentsComponent,
    PdDataPreviewComponent,
    PdNewBusinessProcessGeneralInformationComponent
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
    MatTreeModule,
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
  providers: [SelectedRoleGuard],
  exports: [],
  entryComponents: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
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

    this.matIconRegistry.addSvgIconLiteral(
      'pd-grouping-add-new-group',
      this.domSanitizer.bypassSecurityTrustHtml(
        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path fill="#727272" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>'
      )
    )

    this.matIconRegistry.addSvgIconLiteral(
      'ic-card-view',
      this.domSanitizer.bypassSecurityTrustHtml(
        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">\n' +
        '<path fill="#727272" fill-rule="evenodd" d="M9.58333333,13.6666667 C9.9975469,13.6666667 10.3333333,14.0024531 10.3333333,14.4166667 L10.3333333,21.25 C10.3333333,21.6642136 9.9975469,22 9.58333333,22 L2.75,22 C2.33578644,22 2,21.6642136 2,21.25 L2,14.4166667 C2,14.0024531 2.33578644,13.6666667 2.75,13.6666667 L9.58333333,13.6666667 Z M21.25,13.6666667 C21.6642136,13.6666667 22,14.0024531 22,14.4166667 L22,21.25 C22,21.6642136 21.6642136,22 21.25,22 L14.4166667,22 C14.0024531,22 13.6666667,21.6642136 13.6666667,21.25 L13.6666667,14.4166667 C13.6666667,14.0024531 14.0024531,13.6666667 14.4166667,13.6666667 L21.25,13.6666667 Z M9.58333333,2 C9.9975469,2 10.3333333,2.33578644 10.3333333,2.75 L10.3333333,9.58333333 C10.3333333,9.9975469 9.9975469,10.3333333 9.58333333,10.3333333 L2.75,10.3333333 C2.33578644,10.3333333 2,9.9975469 2,9.58333333 L2,2.75 C2,2.33578644 2.33578644,2 2.75,2 L9.58333333,2 Z M21.25,2 C21.6642136,2 22,2.33578644 22,2.75 L22,9.58333333 C22,9.9975469 21.6642136,10.3333333 21.25,10.3333333 L14.4166667,10.3333333 C14.0024531,10.3333333 13.6666667,9.9975469 13.6666667,9.58333333 L13.6666667,2.75 C13.6666667,2.33578644 14.0024531,2 14.4166667,2 L21.25,2 Z"/>\n' +
        '</svg>'
      )
    )
    this.matIconRegistry.addSvgIconLiteral(
      'ic-list-view',
      this.domSanitizer.bypassSecurityTrustHtml(
        '<svg xmlns="http://www.w3.org/2000/svg" width = "24" height = "24" viewBox = "0 0 24 24" >\n' +
        '<path fill="#727272" fill - rule="evenodd" d = "M6.25,18 C6.66421356,18 7,18.3357864 7,18.75 L7,21.25 C7,21.6642136 6.66421356,22 6.25,22 L2.75,22 C2.33578644,22 2,21.6642136 2,21.25 L2,18.75 C2,18.3357864 2.33578644,18 2.75,18 L6.25,18 Z M21.25,18 C21.6642136,18 22,18.3357864 22,18.75 L22,21.25 C22,21.6642136 21.6642136,22 21.25,22 L10.25,22 C9.83578644,22 9.5,21.6642136 9.5,21.25 L9.5,18.75 C9.5,18.3357864 9.83578644,18 10.25,18 L21.25,18 Z M6.25,10 C6.66421356,10 7,10.3357864 7,10.75 L7,13.25 C7,13.6642136 6.66421356,14 6.25,14 L2.75,14 C2.33578644,14 2,13.6642136 2,13.25 L2,10.75 C2,10.3357864 2.33578644,10 2.75,10 L6.25,10 Z M21.25,10 C21.6642136,10 22,10.3357864 22,10.75 L22,13.25 C22,13.6642136 21.6642136,14 21.25,14 L10.25,14 C9.83578644,14 9.5,13.6642136 9.5,13.25 L9.5,10.75 C9.5,10.3357864 9.83578644,10 10.25,10 L21.25,10 Z M6.25,2 C6.66421356,2 7,2.33578644 7,2.75 L7,5.25 C7,5.66421356 6.66421356,6 6.25,6 L2.75,6 C2.33578644,6 2,5.66421356 2,5.25 L2,2.75 C2,2.33578644 2.33578644,2 2.75,2 L6.25,2 Z M21.25,2 C21.6642136,2 22,2.33578644 22,2.75 L22,5.25 C22,5.66421356 21.6642136,6 21.25,6 L10.25,6 C9.83578644,6 9.5,5.66421356 9.5,5.25 L9.5,2.75 C9.5,2.33578644 9.83578644,2 10.25,2 L21.25,2 Z" />\n' +
        '</svg>\n'
      )
    )

  }
}
