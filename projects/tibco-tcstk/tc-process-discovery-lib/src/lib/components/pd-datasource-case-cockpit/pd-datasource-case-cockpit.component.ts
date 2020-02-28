import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { LiveAppsCaseCockpitComponent } from '@tibco-tcstk/tc-liveapps-lib';

@Component({
  selector: 'tcpd-pd-datasource-case-cockpit',
  templateUrl: './pd-datasource-case-cockpit.component.html',
  styleUrls: ['./pd-datasource-case-cockpit.component.css']
})

export class PdDatasourceCaseCockpitComponent extends LiveAppsCaseCockpitComponent {
    ngOnChanges(changes: SimpleChanges): void {
        // disable fav button
        this.incFavButton = false;
        this.incConfigButton = false;
        this.incRefreshButton = false;
        // add a new button

        // setup button array
        this.toolbarButtons = [];

        // Remove tabs
        this.showDocuments = true;

        // call superclass init
        super.ngOnChanges(changes);
    }
}
