import { Component, OnInit } from '@angular/core';
import { MessageQueueService } from '@tibco-tcstk/tc-core-lib';
import { Router, ActivatedRoute } from '@angular/router';
import { LiveAppsService, CaseRoute } from '@tibco-tcstk/tc-liveapps-lib';
import { map, flatMap } from 'rxjs/operators';
import { InvestigateCase, Datasource } from '../../models/tc-process-discovery';
import { PdProcessDiscoveryService } from '../../services/pd-process-discovery.service';

@Component({
    selector: 'tcpd-pd-datasources-administration',
    templateUrl: './pd-datasources-administration.component.html',
    styleUrls: ['./pd-datasources-administration.component.css']
})
export class PdDatasourcesAdministrationComponent implements OnInit {

    public cases = [];
    public datasourceId: string;
    public sandboxId: number;
    public displayType: string;
    public uiAppId: string;

    constructor(
        private processDiscovery: PdProcessDiscoveryService,
        private route: ActivatedRoute,
        private router: Router,
        private liveapps: LiveAppsService,
        private messageService: MessageQueueService) { }

    ngOnInit() {
        this.messageService.sendMessage('title-bar', 'business-processes');

        const claims = this.route.snapshot.data.claims;
        this.sandboxId = Number(claims.primaryProductionSandbox.id).valueOf();
        this.datasourceId = this.route.snapshot.data.processDiscovery.datasourceAppId.valueOf();
        this.uiAppId = this.route.snapshot.data.processDiscovery.uiAppId;

        this.cases = [];
        this.liveapps.getCases(this.sandboxId, this.datasourceId, '1', 0, 100)
            .pipe(
                map(caseList => {
                    caseList.caseinfos.sort((a, b) => (a.casedataObj.AnalysisID > b.casedataObj.AnalysisID) ? 1 : ((b.casedataObj.AnalysisID > a.casedataObj.AnalysisID) ? -1 : 0));
                    caseList.caseinfos.forEach(element => {
                        this.cases.push(element.caseReference);
                    });
                })
            )
            .subscribe(null, error => { console.log("***** error " + error.error.errorMsg); }) //this.errorMessage = 'Error retrieving applications: ' + error.error.errorMsg; });

        this.displayType = 'miniCard';
    }

    clickCaseAction = ($event: CaseRoute) => {
        this.router.navigate(['/starterApp/pd/datasource/case/' + $event.appId + '/' + $event.typeId + '/' + $event.caseRef]);
    }

    public addNewAnalysis = (): void => {
      this.router.navigate(['/starterApp/configuration/new-analysis']);
    }

    public refresh = () => {
        console.log("Refresh");
    }
}
