import { Component, OnInit, ViewChild, OnChanges, SimpleChanges, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SpotfireCustomization } from '@tibco/spotfire-wrapper/lib/spotfire-customization';
import { SpotfireWrapperComponent, SpotfireConfig } from '@tibco-tcstk/tc-spotfire-lib';
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
export class PdProcessMiningComponent implements OnChanges {

  @ViewChild(SpotfireWrapperComponent, { static: false }) spotfireWrapperComponent: SpotfireWrapperComponent;

  // Spotfire general configuration
  @Input() spotfireConfig : SpotfireConfig;
  @Input() parameters: string;

  // Spotfire wrappter configuration
  public spotfireServer: string;
  public analysisPath: string;
  public allowedPages : string[];
  public activePage: string;
  public markingOn = {};
  public markingName: string;
  public configuration: SpotfireCustomization;

  public ready: boolean = false;

  constructor(
  ) {
  }

  private initialize = ():void => {
    this.spotfireServer = this.spotfireConfig.spotfireServer;
    this.activePage = this.spotfireConfig.activePageForHome;
    this.allowedPages = this.spotfireConfig.allowedPages;
    this.markingName = this.spotfireConfig.markingName;
    this.configuration = {
      showAbout: false,
      showAnalysisInformationTool: false,
      showAuthor: false,
      showClose: false,
      showCustomizableHeader: false,
      showDodPanel: false,
      showExportFile: false,
      showFilterPanel: true,
      showHelp: false,
      showLogout: false,
      showPageNavigation: false,
      showStatusBar: true,
      showToolBar: false,
      showUndoRedo: false
    };
    this.analysisPath = this.spotfireConfig.analysisPath;
    this.markingOn[this.spotfireConfig.tableName] = this.spotfireConfig.columnNames;
    // this.activePage = 'Config';
    // this.allowedPages = ['Config'];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.ready && this.spotfireConfig && this.parameters){
      this.initialize();
      this.ready = true;
    }
    if (this.ready && !changes.parameters.firstChange){
      this.spotfireWrapperComponent.showPage(this.activePage);
    }
  }

  public tabChange = ($event: any): void => {
    this.spotfireWrapperComponent.openPage(this.allowedPages[$event.index]);
  }

  public marking(data) {
    // this.messageService.sendMessage('marking', data);
  }
}
