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
    this.form.get('location').setValue(window.location.origin + '/webresource/orgFolders/' + this.FOLDERID + '/' + $event.name)
  }

}
