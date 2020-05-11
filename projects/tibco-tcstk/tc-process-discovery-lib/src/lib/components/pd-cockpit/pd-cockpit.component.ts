import { Component, ViewEncapsulation, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { PdProcessDiscoveryService } from '../../services/pd-process-discovery.service';
import { map } from 'rxjs/operators';
import { SpotfireConfig } from '@tibco-tcstk/tc-spotfire-lib';
import { UxplPrimaryNav } from '@tibco-tcstk/cloudstartercomponents/dist/types/components/uxpl-primary-nav/uxpl-primary-nav';
import { MessageQueueService } from '@tibco-tcstk/tc-core-lib';

@Component({
  selector: 'tcpd-pd-cockpit',
  templateUrl: './pd-cockpit.component.html',
  styleUrls: ['./pd-cockpit.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PdCockpitComponent implements AfterViewInit, OnDestroy {

  sandboxId: any;

  private subscription: Subscription;

  public spotfireConfig: SpotfireConfig;
  public parameters: string;
  private analytics: boolean = false;

  @ViewChild('primaryNav', { static: false }) nav: ElementRef<UxplPrimaryNav>;
  public tabs: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageQueueService,
    private processDiscovery: PdProcessDiscoveryService
  ) {
    this.subscription = this.messageService.getMessage('title-bar').subscribe(message => {
      setTimeout(() => {
        this.handleClick({ detail: { id: 'analytics'}})
      });
    });
   }

  ngAfterViewInit() {
    this.nav.nativeElement.tabs = [
      { id: 'process-analysis', label: 'Process Analysis' },
      { id: 'analytics'       , label: 'Analytics'        },
      { id: 'cases'           , label: 'Cases'            },
      { id: 'data'            , label: 'Data'             },
      { id: 'administration'  , label: 'Administration'   }
    ];
    this.nav.nativeElement.setTab(this.nav.nativeElement.tabs[0]);

    this.sandboxId = this.route.snapshot.data.claims.primaryProductionSandbox.id;
    this.spotfireConfig = this.route.snapshot.data.spotfireConfigHolder;

  }

  handleClick = (ev: any): void => {
    console.log("**** Event: ", ev);
    const event = ev.detail.id;

    if (event == 'process-analysis') {
      this.analytics = false;
      this.router.navigate(['/starterApp/pd/business-processes']);
    }

    if (event == 'analytics') {
      this.processDiscovery.getCurrentDatasource().pipe(
        map(datasource => {
          if (datasource) {
            this.analytics = true;
            this.spotfireConfig.analysisPath = this.spotfireConfig.analysisPath + (datasource.addSuffix ? '_' + datasource.datasourceId : '');
            this.parameters = 'AnalysisId = "' + datasource.datasourceId + '";';
          } else {
            this.nav.nativeElement.setTab(this.nav.nativeElement.tabs[0]);
          }
        })
      ).subscribe();
    }

    if (event == 'cases') {
      this.analytics = false;
      this.router.navigate(['/starterApp/pd/case-view']);
    }

    if (event == 'data') {

    }

    if (event == 'administration') {
      this.router.navigate(['/starterApp/configuration/']);
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public handleToolbarButtonEvent = (buttonId: string) => {
    if (buttonId === 'refresh') {
      this.refresh();
    }
  }

  public showAnalytics = (): boolean => {
    return this.analytics;
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

