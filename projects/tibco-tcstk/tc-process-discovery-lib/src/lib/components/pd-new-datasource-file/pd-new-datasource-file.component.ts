import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'pd-new-datasource-file',
  templateUrl: './pd-new-datasource-file.component.html',
  styleUrls: ['./pd-new-datasource-file.component.css']
})
export class PdNewDatasourceFileComponent implements OnInit {
  public FOLDERID = 'datasources';

  @Input() form: FormGroup;
  @Input() inputType: string;
  @Input() data;
  @Input() columns: string[];

  constructor() { }

  ngOnInit() {
  }

  public handleSelectedDocument = ($event: any): void => {
    this.form.get('filename').setValue($event.name);

    // if in devmode change the location to TIBCO Cloud in EU
    const host = window.location.hostname === 'localhost' ? 'https://eu.liveapps.cloud.tibco.com' : window.location.origin;
    this.form.get('location').setValue(host + '/webresource/orgFolders/' + this.FOLDERID + '/' + $event.name)
  }

}
