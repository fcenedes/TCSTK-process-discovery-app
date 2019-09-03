import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'pd-new-business-process-other-options',
  templateUrl: './pd-new-business-process-other-options.component.html',
  styleUrls: ['./pd-new-business-process-other-options.component.css']
})
export class PdNewBusinessProcessOtherOptionsComponent implements OnInit {

    @Input() form: FormGroup;
    
  constructor() { }

  ngOnInit() {
  }

}
