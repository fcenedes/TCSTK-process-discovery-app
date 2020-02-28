import { Component, OnInit } from '@angular/core';
import { CaseRoute, LiveAppsService } from '@tibco-tcstk/tc-liveapps-lib';
import { PdProcessDiscoveryService } from '../../services/pd-process-discovery.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageQueueService } from '@tibco-tcstk/tc-core-lib';
import { map, flatMap } from 'rxjs/operators';
import { Datasource, InvestigateCase } from '../../models/tc-process-discovery';

@Component({
  selector: 'tcpd-pd-business-processes',
  templateUrl: './pd-business-processes.component.html',
  styleUrls: ['./pd-business-processes.component.css']
})
export class PdBusinessProcessesComponent implements OnInit {

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
            if (element.summaryObj.state === 'Ready'){
              this.cases.push(element.caseReference);
            }
          });
        })
      )
      .subscribe(null, error => { console.log("***** error " + error.error.errorMsg); }) //this.errorMessage = 'Error retrieving applications: ' + error.error.errorMsg; });

    this.displayType = 'card';
  }

  public addNewAnalysis = (): void => {
    this.router.navigate(['/starterApp/configuration/new-analysis']);
  }

  public clickInvestigateAction = ($event: InvestigateCase): void => {
      this.liveapps.getCaseByRef(this.sandboxId, $event.caseRef).pipe(
          flatMap(caseInfo => {
              const datasource: Datasource = new Datasource().deserialize({
                  datasourceId: caseInfo.untaggedCasedataObj.ID,
                  description: caseInfo.untaggedCasedataObj.Description,
                  caseRef: caseInfo.caseReference,
                  addSuffix: (caseInfo.untaggedCasedataObj.Spotfire && caseInfo.untaggedCasedataObj.Spotfire.AddSuffix_1 === 'Yes' ? true : false)
              });
              return this.processDiscovery.setCurrentDatasource(datasource).pipe(
                  map(_ => {
                      this.messageService.sendMessage('title-bar', 'process-mining-view');
                  })
              );
          })
      ).subscribe();
  }

  public refresh = () => {
    console.log("Refresh");
  }
}
