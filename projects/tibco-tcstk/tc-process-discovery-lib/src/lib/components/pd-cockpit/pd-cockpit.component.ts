import { Component, OnInit, ViewEncapsulation, OnDestroy, ViewChild } from '@angular/core';
import { TcButtonsHelperService, ToolbarButton, RoleAttribute, MessageQueueService } from '@tibco-tcstk/tc-core-lib';
import { TcRolesService, CaseType, LiveAppsCreatorDialogComponent, CaseCreatorSelectionContext, FormConfig } from '@tibco-tcstk/tc-liveapps-lib';
import { Router, ActivatedRoute, RouterOutlet } from '@angular/router';
import { MatButtonToggleChange, MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';
import { PdProcessDiscoveryService } from '../../services/pd-process-discovery.service';
import { map } from 'rxjs/operators';
import { CustomFormDefs } from '@tibco-tcstk/tc-forms-lib';
import { SpotfireConfig } from '@tibco-tcstk/tc-spotfire-lib';

@Component({
  selector: 'tcpd-pd-cockpit',
  templateUrl: './pd-cockpit.component.html',
  styleUrls: ['./pd-cockpit.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PdCockpitComponent implements OnInit, OnDestroy {

  public title: string;
  public toolbarButtons: ToolbarButton[];
  public burgerMenuButtons: ToolbarButton[];
  public displayRoles: RoleAttribute[];
  public currentRole: RoleAttribute;
  public marking = {};

  public currentView: string;
  sandboxId: any;
  appIds: any;

  private subscription: Subscription;

  public customFormDefs: CustomFormDefs;

  public spotfireConfig: SpotfireConfig;
  public parameters: string;
  private analytics: boolean = false;
  private enableAnalyticsMenu: boolean = false;
  public formConfig: FormConfig;

  constructor(
    private buttonsHelper: TcButtonsHelperService,
    private roleService: TcRolesService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private messageService: MessageQueueService,
    private processDiscovery: PdProcessDiscoveryService
  ) {
    this.subscription = this.messageService.getMessage('marking').subscribe(message => {
      this.marking = message.text;
    });
    this.subscription = this.messageService.getMessage('title-bar').subscribe(message => {
      setTimeout(() => {
        this.currentView = message.text;
        this.generateTitle();
        this.marking = {};
      });
    });
  }

  ngOnInit() {
    this.burgerMenuButtons = this.createViewButtons();

    this.displayRoles = this.route.snapshot.data.rolesHolder.roles.filter(role => !role.configuration);
    this.currentRole = this.roleService.getCurrentRole();

    this.sandboxId = this.route.snapshot.data.claims.primaryProductionSandbox.id;
    this.appIds = this.route.snapshot.data.laConfigHolder.liveAppsConfig.applicationIds;
    this.spotfireConfig = this.route.snapshot.data.spotfireConfigHolder;

    this.customFormDefs = this.route.snapshot.data.customFormDefs;
    this.formConfig = this.route.snapshot.data.formConfig;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  protected createToolbarButtons = (): ToolbarButton[] => {
    const refreshButton = this.buttonsHelper.createButton('refresh', 'tcs-refresh-icon', true, 'Refresh', true, true);
    const buttons = [refreshButton];

    return buttons;
  }

  protected createViewButtons = (): ToolbarButton[] => {
    const caseView = this.buttonsHelper.createButton('case-view', '', true, 'Case View', true, true, 'Case View');
    const datasourcesView = this.buttonsHelper.createButton('business-processes', '', true, 'Business Processes', true, true, 'Business Processes');
    const analytics = this.buttonsHelper.createButton('process-mining-view', '', true, 'Analytics', true, this.enableAnalyticsMenu, 'Analytics');
    const config = this.buttonsHelper.createButton('config', 'tcs-capabilities', true, 'Config', true, true, 'Config');
    const buttons = [caseView, datasourcesView, analytics, config];

    return buttons;
  }

  public handleToolbarButtonEvent = (buttonId: string) => {
    if (buttonId === 'refresh') {
      this.refresh();
    }
  }

  public handleViewButtonEvent = (event: string) => {

    // if (event === this.currentView) {
    //   this.analytics = true;
    //   return;
    // }

    if (event === 'process-mining-view'){
      this.messageService.sendMessage('title-bar', 'process-mining-view');
    }

    if (event === 'case-view' || event === 'business-processes'){
      this.analytics = false;
      this.router.navigate(['/starterApp/pd/' + event]);
    }

    if (event === 'config') {
      this.router.navigate(['/starterApp/configuration/']);
    }
  }

  private generateTitle = (): void => {
    this.analytics = false;
    if (this.currentView === 'case-view') {
      this.title = this.route.snapshot.data.generalConfigHolder.welcomeMessage;
    }

    if (this.currentView === 'business-processes') {
      this.title = 'Business Processes';
    }

    if (this.currentView === 'new-datasource') {
      this.title = 'New datasource';
    }

    if (this.currentView === 'file-management') {
      this.title = 'File management';
    }

    if (this.currentView === 'process-mining-view') {
      this.analytics = true;
      this.enableAnalyticsMenu = true;
      this.processDiscovery.getCurrentDatasource().pipe(
        map(datasource => {
          if (datasource) {
            this.title = datasource.datasourceId + '-' + datasource.description;
            this.spotfireConfig.analysisPath = this.spotfireConfig.analysisPath + (datasource.addSuffix ? '_' + datasource.datasourceId : '');
            this.parameters = 'AnalysisId = "' + datasource.datasourceId + '";';
          } else {
            this.router.navigate(['/starterApp/pd/business-processes']);
          }
        })
      ).subscribe();
    }

    this.toolbarButtons = this.createToolbarButtons();
    this.burgerMenuButtons = this.createViewButtons();
  }

  public roleChange = ($role: RoleAttribute): void => {
    console.log('Role chante to ', $role);
    this.roleService.setCurrentRole($role);
    this.currentRole = this.roleService.getCurrentRole();
    console.log("new Role: ", this.currentRole);

    // // this.viewButtons = 0;
    // this.viewButtons[0] = this.createViewButtons()[0];
  }

  public handleCreatorAppSelection = (application: CaseType): void => {
    let selectedVariant: string = '';
    let selectedVariantID: string = '';

    if (this.marking) {
      if (this.marking['Variant'] != null) {
        if (this.marking['Variant']['uncompliantVariants'] != null) {
          if (this.marking['Variant']['uncompliantVariants']['case_id'] != null) {
            selectedVariantID = this.marking['Variant']['uncompliantVariants']['case_id'].toString();
            selectedVariant = 'Compliance case at ' + new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString();
          }
        }
      }
      // if (this.marking['Variant'] != null) {
      //     if (this.marking['Variant']['uncompliantVariants'] != null) {
      //         if (this.marking['Variant']['uncompliantVariants']['variant_id'] != null) {
      //             console.log('Selected Uncompliand Variant IDs: ', this.marking['Variant']['uncompliantVariants']['variant_id']);
      //         }
      //     }
      // }
    }

    const EXAMPLE_INITIAL_DATA = {
      DiscoverCompliance: {
        ShortDescription: selectedVariant,
        Context: {
          ContextType: 'Case', // For now, can be changed in the future to Variant or None
          ContextID: selectedVariantID
        },
        DataSourceName: this.title.slice(11, this.title.length),
        DataSourceId: this.title.slice(0, 10)
      },
      DiscoverImprovement: {
        ShortDescription: selectedVariant,
        Context: {
          ContextType: 'Case', // For now, can be changed in the future to Variant or None
          ContextID: selectedVariantID
        },
        DataSourceName: this.title.slice(11, this.title.length),
        DataSourceId: this.title.slice(0, 10)
      }
    };
    this.openCreatorDialog(application, EXAMPLE_INITIAL_DATA, this.sandboxId, this.customFormDefs);
  }

  private openCreatorDialog = (application: CaseType, initialData, sandboxId, customFormDefs) => {
    const dialogRef = this.dialog.open(LiveAppsCreatorDialogComponent, {
      width: '60%',
      height: '80%',
      maxWidth: '100vw',
      maxHeight: '100vh',
      panelClass: 'tcs-style-dialog',
      data: new CaseCreatorSelectionContext(application, initialData, sandboxId, customFormDefs, false, "material-design", this.formConfig)
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigate(['/starterApp/pd/case/' + result.appId + '/' + result.typeId + '/' + result.caseRef], {});
      }
    });
  }

  public showAnalytics = (): boolean => {
    return this.analytics;
  }

  public handleCreateNewAnalysis = (): void => {
    this.router.navigate(['/starterApp/configuration/new-analysis']);
  }

  @ViewChild(RouterOutlet, { static: false }) routerOutlet: RouterOutlet;

  public refresh = () => {
    // @ts-ignore
    if (this.routerOutlet.component.refresh) {
      // @ts-ignore
      this.routerOutlet.component.refresh();
    }
  }
}

