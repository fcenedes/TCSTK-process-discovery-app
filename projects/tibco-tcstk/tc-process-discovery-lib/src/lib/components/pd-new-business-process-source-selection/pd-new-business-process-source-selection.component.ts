import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatStepper } from '@angular/material';

@Component({
    selector: 'pd-new-business-process-source-selection',
    templateUrl: './pd-new-business-process-source-selection.component.html',
    styleUrls: ['./pd-new-business-process-source-selection.component.css']
})

export class PdNewBusinessProcessSourceSelectionComponent implements OnInit {

    @Input() form: FormGroup;
    @Input() preview: FormControl;  
    @Output() refresh = new EventEmitter<string>();
    // @ViewChild('stepper', {static:true}) stepper: MatStepper;
  

    public inputTypeOptions = [
        { text: 'CSV', value: 'csv' },
        { text: 'JSON', value: 'json' }
    ]
    public allowedExtension: string;

    constructor() { }

    ngOnInit() {
        
    }

    onFileSelect(filelist: File[]){
        this.form.get('file').setValue(filelist[0]);
        this.form.get('filename').setValue(filelist[0].name);
    }

    public disableButtonTab = (): boolean => {

        // inputType, analysis name, analysis description and file name has defined values
        if (this.form.get('inputType') && this.form.get('inputType').value &&
            this.form.get('analysisName') && this.form.get('analysisName').value &&
            this.form.get('analysisDescription') && this.form.get('analysisDescription').value &&
            this.form.get('filename') && this.form.get('filename').value) {
            return false;
        };

        return true;
    }

    public showButtons = (): boolean => {
        return typeof(this.form.get('file').value) == 'object'
    }

    public showSelectFileButton = (): boolean => {
        return this.form.get('filename') && this.form.get('filename').value == '';
    }

    public showChangeFileButton = (): boolean => {
        return !this.showSelectFileButton();
    }

    public showFileSelection = (): boolean => {

        if (this.form.get('inputType') && this.form.get('inputType').value){
            this.allowedExtension = '.' + this.form.get('inputType').value
            return true; 
        } else {
            return false;
        }

    }

    public moveNextTab = (): void => {
        this.refresh.emit();
    }
}
