import { Component, OnInit, ViewChild, OnChanges, SimpleChanges, Input, ElementRef } from '@angular/core';
import { SpotfireCustomization } from '@tibco/spotfire-wrapper/lib/spotfire-customization';
import { SpotfireWrapperComponent, SpotfireConfig } from '@tibco-tcstk/tc-spotfire-lib';

import { UxplLeftNav } from '@tibco-tcstk/cloudstartercomponents/dist/types/components/uxpl-left-nav/uxpl-left-nav';


@Component({
  selector: 'tcpd-pd-process-mining',
  templateUrl: './pd-process-mining.component.html',
  styleUrls: ['./pd-process-mining.component.css']
})
export class PdProcessMiningComponent implements OnChanges {

  @ViewChild(SpotfireWrapperComponent, { static: false }) spotfireWrapperComponent: SpotfireWrapperComponent;
  @ViewChild('leftNav', { static: false }) leftNav: ElementRef<UxplLeftNav>;
  public tabs: any;

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

  constructor() {}

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

    this.leftNav.nativeElement.tabs = [];
    this.spotfireConfig.allowedPages.forEach(
      (pageName: string) => {
        const menuEntry = { id: pageName, label: pageName, child: [] };
        this.leftNav.nativeElement.tabs.push(menuEntry);
    })
  }

  handleClick = (event: any): void => {
    console.log('***** Left Menu selected: ', event);
    this.spotfireWrapperComponent.openPage(this.allowedPages[event.id]);
  };

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
