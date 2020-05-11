import { Component, OnInit } from '@angular/core';
import { LiveAppsService, CaseInfo } from '@tibco-tcstk/tc-liveapps-lib';
import { PdProcessDiscoveryService } from '../../services/pd-process-discovery.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageQueueService } from '@tibco-tcstk/tc-core-lib';
import { map, flatMap } from 'rxjs/operators';
import { Datasource } from '../../models/tc-process-discovery';

@Component({
  selector: 'tcpd-pd-business-processes',
  templateUrl: './pd-business-processes.component.html',
  styleUrls: ['./pd-business-processes.component.css']
})
export class PdBusinessProcessesComponent implements OnInit {

  public cases = [];
  public datasourceId: string;
  public sandboxId: number;
  // public displayType: string;
  public uiAppId: string;
  public config = {};
  public viewMode = "list-view";
  public viewIcon = 'ic-list-view';

  constructor(
    private processDiscovery: PdProcessDiscoveryService,
    private route: ActivatedRoute,
    private router: Router,
    private liveapps: LiveAppsService,
    private messageService: MessageQueueService) { }

  public fromMain(event){
    console.log("***** ", event);
  }

  ngOnInit() {
    const newAnalysis = document.getElementById('#newAnalysis');
    newAnalysis.addEventListener('clicked', event => { this.newAnalysis() })

    const claims = this.route.snapshot.data.claims;
    this.sandboxId = Number(claims.primaryProductionSandbox.id).valueOf();
    this.datasourceId = this.route.snapshot.data.processDiscovery.datasourceAppId.valueOf();
    this.uiAppId = this.route.snapshot.data.processDiscovery.uiAppId;

    this.cases = [];
    // this.liveapps.getCases(this.sandboxId, this.datasourceId, '1', 0, 100).pipe(
    this.liveapps.getCasesWithUserInfo(this.sandboxId, this.datasourceId, '1', 0, 100).pipe(
      map(caseList => {
        caseList.caseinfos.sort((a, b) => (a.casedataObj.AnalysisID > b.casedataObj.AnalysisID) ? 1 : ((b.casedataObj.AnalysisID > a.casedataObj.AnalysisID) ? -1 : 0));
        caseList.caseinfos.forEach(element => {
          var newElement = {
            itemId: element.caseReference,
            content: {
              header: element.summaryObj.ID,
              line1: {
                label: 'Data source',
                value: element.casedataObj.InputType.toUpperCase()
              },
              line2: {
                label: 'Business process',
                value: element.summaryObj.Description
              },
                note: 'Created ' + this.timeDifference(Date.now(), new Date(element.metadata.creationTimestamp).getTime()) + ' by ' + element.metadata.createdByDetails.firstName + ' ' + element.metadata.createdByDetails.lastName
            },
            footer: {
              badge: {
                value: element.summaryObj.state,
                backgroundColor: '#E1F7EB',
                icon: 'assets/cslib/svg/ic-done.svg'
              },
              action: {
                label: 'View details',
                icon: 'assets/cslib/svg/ic-next.svg'
              }
            }
          };
          this.cases.push(newElement)
        });
      })
    ).subscribe(
      null,
      error => {
        console.log("***** error " + error.error.errorMsg);
      }
    );
  }


  public newAnalysis = (): void => {
    this.router.navigate(['/starterApp/configuration/new-analysis']);
  }

  public refresh = () => {
    console.log("Refresh");
  }

  public switchMode() {
    if (this.viewMode == 'card-view') {
      this.viewMode = 'list-view'
    } else {
      this.viewMode = 'card-view'
    }
    this.viewIcon = 'ic-' + this.viewMode;
  }

  public isViewMode = (mode: string): boolean => {
    return this.viewMode === mode;
  }

  public cardClick = (event: any): void => {
    console.log("**** ", event);
    this.liveapps.getCaseByRef(this.sandboxId, event.detail).pipe(
      flatMap((caseInfo: CaseInfo) => {
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

  private timeDifference(current, previous) {

  var msPerMinute = 60 * 1000;
  var msPerHour = msPerMinute * 60;
  var msPerDay = msPerHour * 24;
  var msPerMonth = msPerDay * 30;
  var msPerYear = msPerDay * 365;

  var elapsed = current - previous;

  if (elapsed < msPerMinute) {
    return Math.round(elapsed / 1000) + ' seconds ago';
  }

  else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + ' minutes ago';
  }

  else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + ' hours ago';
  }

  else if (elapsed < msPerMonth) {
    return 'approximately ' + Math.round(elapsed / msPerDay) + ' days ago';
  }

  else if (elapsed < msPerYear) {
    return 'approximately ' + Math.round(elapsed / msPerMonth) + ' months ago';
  }

  else {
    return 'approximately ' + Math.round(elapsed / msPerYear) + ' years ago';
  }
}
}
