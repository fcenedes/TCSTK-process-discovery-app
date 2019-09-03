import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'pd-new-business-process-parsing',
    templateUrl: './pd-new-business-process-parsing.component.html',
    styleUrls: ['./pd-new-business-process-parsing.component.css']
})
export class PdNewBusinessProcessParsingComponent implements OnInit {

    @Input() form: FormGroup;
    @Input() data;
    @Input() columns: string[];
    @Output() refresh = new EventEmitter();

    public panelOpenState: boolean = false;

    public datasource;
    public displayedColumns: string[];
    public encodingOptions: string[] = ['UTF-8', 'ISO-8859-1', 'Windows-1251', 'Windows-1252'];
    public dateTimeFormatOptions: string[] = ['yyyy-MM-dd HH:mm:ss.SSS', 'yyyy-MM-dd HH:mm:ss'];

    constructor() { }

    ngOnInit() {

        this.form.get('skipComments').valueChanges.subscribe(val => {
            if (val){
                this.form.get('comments').enable();
            } else {
                this.form.get('comments').disable();
            }
        })

        this.form.get('preview').valueChanges.subscribe(val => {
            if (val) {
                this.form.get('numberRowsForPreview').enable();
            } else {
                this.form.get('numberRowsForPreview').disable();
            }
        })

        this.panelOpenState = !this.form.get('preview').value;
    }

    public refreshButton = (): void => {
        this.refresh.emit();

    }
}
