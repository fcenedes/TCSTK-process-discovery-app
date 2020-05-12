import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'pd-new-business-process-source-selection',
    templateUrl: './pd-new-business-process-source-selection.component.html',
    styleUrls: ['./pd-new-business-process-source-selection.component.css']
})

export class PdNewBusinessProcessSourceSelectionComponent implements OnInit {

    @Input() form: FormGroup;
    @Input() preview: FormControl;
  @Input() data;
  @Input() columns: string[];


    @Output() refresh = new EventEmitter<string>();

    public inputTypeOptions = [
        { text: 'CSV', value: 'csv' },
        { text: 'Data virtualization', value: 'tdv' }
    ]
    public allowedExtension: string;

    constructor() { }

    ngOnInit() {

    }

    public disableButtonTab = (): boolean => {
        if (this.form.get('inputType') && this.form.get('inputType').value &&
           ((this.form.get('file').get('filename') && this.form.get('file').get('filename').value) || (this.form.get('tdv').get('table') && this.form.get('tdv').get('table').value))) {
            return false;
        };
        return true;
    }

    public showFileSelection = (): boolean => {

        if (this.form.get('inputType') && (this.form.get('inputType').value === "json" || this.form.get('inputType').value === "csv")) {
            this.allowedExtension = '.' + this.form.get('inputType').value
            return true;
        } else {
            return false;
        }
    }

    public showDataVirtualization = (): boolean => {
        return this.form.get('inputType') && this.form.get('inputType').value === "tdv"
    }

    public moveNextTab = (): void => {
        this.refresh.emit();
    }
}
