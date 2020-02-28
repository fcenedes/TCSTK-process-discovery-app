import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TcButtonsHelperService, RoleAttribute, MessageQueueService } from '@tibco-tcstk/tc-core-lib';
import { MatDialog } from '@angular/material';
import {LiveAppsHomeCockpitComponent, TcRolesService, Groups} from '@tibco-tcstk/tc-liveapps-lib';

@Component({
    selector: 'tcpd-pd-case-view',
    templateUrl: './pd-case-view.component.html',
    styleUrls: ['./pd-case-view.component.css']
})
export class PdCaseViewComponent extends LiveAppsHomeCockpitComponent {
    public sandboxId: number;
    public appIds: string[];
    public uiAppId: string;
    public userId: string;

    constructor(
        private router: Router, 
        private route: ActivatedRoute,
        protected buttonsHelper: TcButtonsHelperService,
        public dialog: MatDialog,
        protected roleService: TcRolesService,
        private messageService: MessageQueueService
    ) {
        super(buttonsHelper, dialog, roleService);
     }

    ngOnInit() {
        this.messageService.sendMessage('title-bar', 'case-view');
        
        this.sandboxId = this.route.snapshot.data.claims.primaryProductionSandbox.id;
        this.appIds = this.route.snapshot.data.laConfigHolder.liveAppsConfig.applicationIds;
        this.uiAppId = this.route.snapshot.data.laConfigHolder.generalConfig.uiAppId;
        this.userId = this.route.snapshot.data.claims.userId;
    }

    clickCaseAction = ($event: any): void => {
        this.router.navigate(['/starterApp/pd/case/' + $event.appId + '/' + $event.typeId + '/' + $event.caseRef], { });
    }
}
