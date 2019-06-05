import { Component, OnInit } from '@angular/core';
import { LiveAppsCaseCockpitComponent } from '@tibco-tcstk/tc-liveapps-lib';

@Component({
  selector: 'tcpd-pd-case-cockpit',
  templateUrl: './pd-case-cockpit.component.html',
  styleUrls: ['./pd-case-cockpit.component.css']
})
export class PdCaseCockpitComponent extends LiveAppsCaseCockpitComponent  implements OnInit {

    ngOnInit() {
        // disable fav button
        // this.incFavButton = false;
        this.incConfigButton = false;
        this.incRefreshButton = false;
        // add a new button

        // setup button array
        this.toolbarButtons = [];
        // call superclass init
        super.ngOnInit();
    }


}
