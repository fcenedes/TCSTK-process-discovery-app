import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'pd-new-business-process-confirmation',
    templateUrl: './pd-new-business-process-confirmation.component.html',
    styleUrls: ['./pd-new-business-process-confirmation.component.css']
})
export class PdNewBusinessProcessConfirmationComponent implements OnInit {

    @Input() form: FormGroup;
    @Input() form2: FormGroup;
    @Input() form3: FormGroup
    @Input() caseCreated: boolean;
    @Input() caseURL: string;
    @Output() confirmButtonClicked = new EventEmitter();

    constructor(
        private router: Router
    ) { }

    ngOnInit() {
    }

    public confirmClicked = (): void => {
        
        this.confirmButtonClicked.emit();
    }

    public goToBusinessProcesses = (): void  => {
        this.router.navigate(['/starterApp/pd/business-processes']);
    }

    public goToCase = (): void => {
        this.router.navigate([this.caseURL]);
    }

}
