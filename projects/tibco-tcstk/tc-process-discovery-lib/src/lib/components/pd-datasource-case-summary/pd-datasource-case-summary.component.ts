import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { LiveAppsCaseSummaryComponent, LiveAppsService, TcCaseCardConfigService } from '@tibco-tcstk/tc-liveapps-lib';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { PdProcessDiscoveryService } from '../../services/pd-process-discovery.service';
import { InvestigateCase, Datasource } from '../../models/tc-process-discovery';
import { MessageQueueService } from '@tibco-tcstk/tc-core-lib';
import { flatMap, map } from 'rxjs/operators';

@Component({
  selector: 'tcpd-pd-datasource-case-summary',
  templateUrl: './pd-datasource-case-summary.component.html',
  styleUrls: ['./pd-datasource-case-summary.component.css']
})

export class PdDatasourceCaseSummaryComponent extends LiveAppsCaseSummaryComponent {

  @Output() clickInvestigate: EventEmitter<InvestigateCase> = new EventEmitter<InvestigateCase>();

  public clickInvestigateAction = (caseRef) => {
    const investigateCase = new InvestigateCase().deserialize({ caseRef: this.caseRef });
    this.clickInvestigate.emit(investigateCase);
  }
}
