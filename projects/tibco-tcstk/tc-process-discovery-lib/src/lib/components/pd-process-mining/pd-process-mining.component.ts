import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SpotfireCustomization } from '@tibco/spotfire-wrapper/lib/spotfire-customization';
import { SpotfireWrapperComponent } from '@tibco-tcstk/tc-spotfire-lib';
import { PdProcessDiscoveryService } from '../../services/pd-process-discovery.service';
import { ToolbarButton, MessageQueueService } from '@tibco-tcstk/tc-core-lib';
import { MatDialog } from '@angular/material';
import { Roles, TcRolesService, Groups } from '@tibco-tcstk/tc-liveapps-lib';
import { Datasource } from '../../models/tc-process-discovery';

@Component({
  selector: 'tcpd-pd-process-mining',
  templateUrl: './pd-process-mining.component.html',
  styleUrls: ['./pd-process-mining.component.css']
})
export class PdProcessMiningComponent implements OnInit {

    @ViewChild(SpotfireWrapperComponent) spotfireWrapperComponent: SpotfireWrapperComponent;

    // Widget configuration
    public title: string;
    public viewButtons: ToolbarButton[];
    public toolbarButtons: ToolbarButton[];
    // public sandboxId: number;

    // Spotfire configuration
    public spotfireServer: string;
    public analysisPath: string;
    public allowedPages : string[];
    public activePage: string;
    public markingOn = {};
    public markingName: string;
    public parameters: string;
    public configuration: SpotfireCustomization;

    // public appIds: string[];
    // public uiAppId: string;

    public currentDatasource: Datasource;
    // private datasourceAppId: string;     // AppId for the app which contains the datasources

    constructor(
        private route: ActivatedRoute, 
        private processDiscovery: PdProcessDiscoveryService,
        private messageService: MessageQueueService
    ) { 
    }

    ngOnInit() {
        this.messageService.sendMessage('title-bar', 'process-mining-view');

        // this.sandboxId = this.route.snapshot.data.claims.primaryProductionSandbox.id;
        // this.uiAppId = this.route.snapshot.data.laConfigHolder.generalConfig.uiAppId;

        // Spotfire general configuration
        const spotfireConfig = this.route.snapshot.data.spotfireConfigHolder;
        this.spotfireServer = spotfireConfig.spotfireServer;
        this.activePage = spotfireConfig.activePageForHome;
        this.allowedPages = spotfireConfig.allowedPages;
        this.markingName = spotfireConfig.markingName;
        this.configuration = {
            showAbout: false,
            showAnalysisInformationTool: false,
            showAuthor: false,
            showClose: false,
            showCustomizableHeader: false,
            showDodPanel: false,
            showExportFile: false,
            showExportVisualization: false,
            showFilterPanel: true,
            showHelp: false,
            showLogout: false,
            showPageNavigation: false,
            showAnalysisInfo: false,
            showReloadAnalysis: false,
            showStatusBar: false,
            showToolBar: false,
            showUndoRedo: false
        };

        this.markingOn[spotfireConfig.tableName] = spotfireConfig.columnNames;

        this.processDiscovery.getCurrentDatasource().subscribe(
            datasource => {        
                // Spotfire general configuration
                const spotfireConfig = this.route.snapshot.data.spotfireConfigHolder;
                this.analysisPath = spotfireConfig.analysisPath + (datasource.addSuffix ? '_' + datasource.datasourceId : '');
                this.parameters = 'AnalysisId = "' + datasource.datasourceId + '";';

                this.currentDatasource = datasource;
            },
            error => {
                if (error === 'Not datasource defined'){
                    this.title = '';
                }
            })
    }
    
    public tabChange = ($event: any): void => {
        this.spotfireWrapperComponent.openPage(this.allowedPages[$event.index]);
    }

    public marking(data) {
        this.messageService.sendMessage('marking', data);
    }
}
