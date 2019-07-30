import { Component, OnInit } from '@angular/core';
import { LiveAppsService, CaseType, LaProcessSelection } from '@tibco-tcstk/tc-liveapps-lib';
import { Claim } from '@tibco-tcstk/tc-core-lib';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { ProcessDiscoveryConfig } from '../../models/tc-process-discovery-config';
import { PdProcessDiscoveryConfigService } from '../../services/pd-process-discovery-config.service';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'tcpd-pd-settings-configuration',
    templateUrl: './pd-settings-configuration.component.html',
    styleUrls: ['./pd-settings-configuration.component.css']
})
export class PdSettingsConfigurationComponent implements OnInit {

    public claims: Claim;
    public sandboxId: number;
    public selectedApp: CaseType;
    public processDiscoveryConfig: ProcessDiscoveryConfig;
    public datasourceId: string;
    public creatorId: string
  
    constructor(private processDiscoveryConfigService: PdProcessDiscoveryConfigService, private liveapps: LiveAppsService, private route: ActivatedRoute, private snackBar: MatSnackBar) { }

    ngOnInit() {

        this.claims = this.route.snapshot.data.claims;
        this.sandboxId = Number(this.claims.primaryProductionSandbox.id).valueOf();
        this.processDiscoveryConfig = this.route.snapshot.data.processDiscovery;

        // Get values from PUBLIC shared state
        this.datasourceId = this.processDiscoveryConfig.datasourceAppId;

        this.refresh(true);
    }

    selectApplication = ($event: any): void =>{
        this.processDiscoveryConfig.datasourceAppId = $event.applicationId;
    }

    selectCreator = ($event: LaProcessSelection): void => {
        this.processDiscoveryConfig.creatorAppId = $event.process.id;
    }

    selectAction = ($event: LaProcessSelection): void => {
        this.processDiscoveryConfig.validateActionAppId = $event.process.id;
    }

    public refresh = (bypassCache: boolean): void => {

        let appIds: string[] =  (this.datasourceId === "") ? undefined : [ this.datasourceId ];

        this.liveapps.getApplications(this.sandboxId, appIds, 100, bypassCache)
            .pipe(
                map(applicationList => {
                    this.selectedApp = applicationList.casetypes[0];
                })
            )
            .subscribe(null, error => { 
                this.datasourceId = "";
                this.refresh(bypassCache);
            })
    }

    runSaveFuntion = () => {
        var processDiscoveryConfig = this.processDiscoveryConfig;
        this.processDiscoveryConfigService.updateProcessDiscoveryConfig(this.sandboxId, this.processDiscoveryConfig.uiAppId, processDiscoveryConfig, this.processDiscoveryConfig.id).subscribe(
            result => {
                this.snackBar.open('General configuration saved', 'OK', {
                    duration: 3000
                });
            },
            error => {
                this.snackBar.open('Error saving general configuration saved', 'OK', {
                    duration: 3000
                });
            }
        );
    }
}
