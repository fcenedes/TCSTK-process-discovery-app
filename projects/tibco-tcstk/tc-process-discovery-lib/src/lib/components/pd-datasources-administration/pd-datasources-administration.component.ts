import { Component, OnInit } from '@angular/core';
import { MessageQueueService } from '@tibco-tcstk/tc-core-lib';
import { Router, ActivatedRoute } from '@angular/router';
import { LiveAppsService } from '@tibco-tcstk/tc-liveapps-lib';
import { map } from 'rxjs/operators';

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
    
    constructor(
        private route: ActivatedRoute, 
        private router: Router, 
        private liveapps: LiveAppsService,
        private messageService: MessageQueueService) { }

    ngOnInit() {
        this.messageService.sendMessage('title-bar', 'business-processes');

        const claims = this.route.snapshot.data.claims;
        this.sandboxId = Number(claims.primaryProductionSandbox.id).valueOf();
        this.datasourceId = this.route.snapshot.data.processDiscovery.datasourceAppId.valueOf();


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

        this.displayType = 'card';
    }

    clickCaseAction = ($event: any) => {
        this.router.navigate(['/starterApp/pd/datasource/case/' + $event.appId + '/' + $event.typeId + '/' + $event.caseRef]);
    }

    addNewDatasource = (): void => {
        this.router.navigate(['/starterApp/pd/new-datasource'], {});

    }
}
