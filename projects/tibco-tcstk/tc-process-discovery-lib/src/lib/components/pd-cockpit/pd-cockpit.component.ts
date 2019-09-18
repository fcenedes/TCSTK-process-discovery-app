import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { TcButtonsHelperService, ToolbarButton, RoleAttribute, MessageQueueService } from '@tibco-tcstk/tc-core-lib';
import { TcRolesService, CaseType, LiveAppsCreatorDialogComponent, CaseCreatorSelectionContext, AccessResolver } from '@tibco-tcstk/tc-liveapps-lib';
import { Router, ActivatedRoute } from '@angular/router';
import { MatButtonToggleChange, MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';
import { PdProcessDiscoveryService } from '../../services/pd-process-discovery.service';
import { map } from 'rxjs/operators';
import { CustomFormDefs } from '@tibco-tcstk/tc-forms-lib';

@Component({
    selector: 'tcpd-pd-cockpit',
    templateUrl: './pd-cockpit.component.html',
    styleUrls: ['./pd-cockpit.component.css'], 
    encapsulation: ViewEncapsulation.None
})
export class PdCockpitComponent implements OnInit, OnDestroy {

    public title: string;
    public toolbarButtons: ToolbarButton[];
    public viewButtons: ToolbarButton[];
    public displayRoles: RoleAttribute[];
    public currentRole: RoleAttribute;
    public marking = {};

    public currentView: string; 
    sandboxId: any;
    appIds: any;

    private subscription: Subscription;

    public customFormDefs: CustomFormDefs;


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
        this.viewButtons = this.createViewButtons();

        this.displayRoles = this.route.snapshot.data.rolesHolder.roles.filter(role => !role.configuration);
        this.currentRole = this.roleService.getCurrentRole();

        this.sandboxId = this.route.snapshot.data.claims.primaryProductionSandbox.id;
        this.appIds = this.route.snapshot.data.laConfigHolder.liveAppsConfig.applicationIds;

        this.customFormDefs = this.route.snapshot.data.customFormDefs;
    }

    ngOnDestroy(){
        this.subscription.unsubscribe();
    }

    protected createToolbarButtons = (): ToolbarButton[] => {
        const configButton = this.buttonsHelper.createButton('config', 'tcs-capabilities', true, 'Config', true, true);
        const refreshButton = this.buttonsHelper.createButton('refresh', 'tcs-refresh-icon', true, 'Refresh', true, true);
        const buttons = [configButton, refreshButton];

        return buttons;
    }

    public handleToolbarButtonEvent = (buttonId: string) => {
        if (buttonId === 'config') {
            this.router.navigate(['/starterApp/configuration/']);
        }
    }

    protected createViewButtons = (): ToolbarButton[] => {
        const caseView = this.buttonsHelper.createButton('case-view', '', true, 'Case View', true, true);
        const datasourcesView = this.buttonsHelper.createButton('business-processes', '', true, 'Business Processes', true, true);
        const file = this.buttonsHelper.createButton('file-management', '', true, 'File Management', true, true);
        const buttons = [caseView, datasourcesView, file];

        return buttons;
    }

    public handleViewButtonEvent = (event: MatButtonToggleChange) => {
        this.router.navigate(['/starterApp/pd/' + event.value]);
    }

    private generateTitle = (): void => {
            if (this.currentView === 'case-view') {
                this.title = this.route.snapshot.data.generalConfigHolder.welcomeMessage;
            }

        if (this.currentView === 'business-processes'){
                this.title = 'Business Processes';
            }

        if (this.currentView === 'new-datasource'){
            this.title = 'New datasource';
        }

        if (this.currentView === 'file-management'){
            this.title = 'File management';
        }

        if (this.currentView === 'process-mining-view') {
            this.processDiscovery.getCurrentDatasource().pipe(
                map(datasource => {
                    if (datasource) {
                        this.title = datasource.datasourceId + '-' + datasource.description;
                    } else {
                        this.router.navigate(['/starterApp/pd/business-processes']);
                    }
                })
            ).subscribe();
        }

        this.toolbarButtons = this.createToolbarButtons();
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

        if (this.marking){
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
                DataSourceId: this.title.slice(0,10)
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
            data: new CaseCreatorSelectionContext(application, initialData, sandboxId, customFormDefs, false)
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.router.navigate(['/starterApp/pd/case/' + result.appId + '/' + result.typeId + '/' + result.caseRef], {});
            }
        });
    }
}

