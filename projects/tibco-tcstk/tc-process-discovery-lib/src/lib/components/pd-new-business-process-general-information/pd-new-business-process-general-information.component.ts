import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'tcpd-pd-new-business-process-general-information',
  templateUrl: './pd-new-business-process-general-information.component.html',
  styleUrls: ['./pd-new-business-process-general-information.component.css']
})
export class PdNewBusinessProcessGeneralInformationComponent implements OnInit {
  @Input() form: FormGroup;

  constructor() { }

  ngOnInit() {
  }

  public disableButtonTab = (): boolean => {
    if (this.form.get('analysisName') && this.form.get('analysisName').value &&
      this.form.get('analysisDescription') && this.form.get('analysisDescription').value) {
      return false;
    };
    return true;
  }


}
