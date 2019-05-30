import { Component, OnInit } from '@angular/core';
import { LiveAppsCaseSummaryComponent, LiveAppsService, TcCaseCardConfigService } from '@tibco-tcstk/tc-liveapps-lib';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { PdProcessDiscoveryService } from '../../services/pd-process-discovery.service';
import { map, flatMap } from 'rxjs/operators';
import { Datasource } from '../../models/tc-process-discovery';
import { MessageQueueService } from '@tibco-tcstk/tc-core-lib';

@Component({
  selector: 'tcpd-pd-datasource-case-summary',
  templateUrl: './pd-datasource-case-summary.component.html',
  styleUrls: ['./pd-datasource-case-summary.component.css']
})
export class PdDatasourceCaseSummaryComponent extends LiveAppsCaseSummaryComponent {

    constructor(private messageService: MessageQueueService, private route: Router, private processDiscovery: PdProcessDiscoveryService, protected liveapps: LiveAppsService, protected caseCardConfigService: TcCaseCardConfigService, protected sanitizer: DomSanitizer){
        super(liveapps, caseCardConfigService, sanitizer);
    }

    public clickInvestigateAction = (): void => {
        this.liveapps.getCaseByRef(this.sandboxId, this.caseRef).pipe(
            flatMap(caseInfo => {
                const datasource: Datasource = new Datasource().deserialize({ 
                    datasourceId: caseInfo.untaggedCasedataObj.AnalysisID, 
                    description: caseInfo.untaggedCasedataObj.AnalysisDescription, 
                    caseRef: caseInfo.caseReference,
                    addSuffix: (caseInfo.untaggedCasedataObj.Spotfire && caseInfo.untaggedCasedataObj.Spotfire.AddSuffix_1 === 'Yes'? true : false)
                });
                return this.processDiscovery.setCurrentDatasource(datasource).pipe(
                    map(_ => {
                        this.messageService.sendMessage('title-bar', 'process-mining-view');
                        this.route.navigate(['/starterApp/pd/process-mining-view']);
                    })
                );
            })
        ).subscribe();
    }
 
}
