import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DateTimeFormatter, LocalDateTime, LocalDate, LocalTime } from 'js-joda';
import { MatSelectChange, MatSnackBar } from '@angular/material';

@Component({
    selector: 'pd-new-business-process-mapping',
    templateUrl: './pd-new-business-process-mapping.component.html',
    styleUrls: ['./pd-new-business-process-mapping.component.css']
})
export class PdNewBusinessProcessMappingComponent implements OnInit {

    @Input() form: FormGroup;
    @Input() data: (string[])[];
    @Input() columns: string[] = [];
    @Input() dateTimeFormat: string;

    public availableColumns: string[];

    constructor(
        private snackBar: MatSnackBar
    ) { }

    ngOnInit() {
        this.availableColumns = this.columns;
    }

    public validateDate = (field: string, $event: MatSelectChange) => {
        let errors: string[] = [];
        const formatter = DateTimeFormatter.ofPattern(this.dateTimeFormat);
        this.data.forEach(element => {
            let parsedValue;
            // Try to conver to LocalDateTime, LocalDate and LocalTime based on 
            // https://stackoverflow.com/questions/27454025/unable-to-obtain-localdatetime-from-temporalaccessor-when-parsing-localdatetime
            try {
                parsedValue = LocalDateTime.parse(element[$event.value], formatter).format(formatter);
            } catch (error) {
                try{
                    parsedValue = LocalDate.parse(element[$event.value], formatter).format(formatter);
                } catch(error) {
                    try{
                        parsedValue = LocalTime.parse(element[$event.value], formatter).format(formatter);
                    } catch(error){
                        if (element[$event.value] !== parsedValue) {
                            errors.push(element[$event.value]);
                        }
                    }
                }
            }
        });
        if (errors.length != 0) {
            $event.source.value = '';
            if (field === 'start') {
                this.form.get('start').setValue('');
            } else {
                this.form.get('start').setValue('');;
            }
            this.snackBar.open('Error parsing date for field ' + field + ' in values: ' + errors.toString(), 'OK', {
                duration: 3000
            });
        }
    }

    public updateColumns = (column: string): void => {

        let valuesAssigned = [];
        const keys= Object.keys(this.form.controls);

        keys.forEach(element => {
            if (this.form.controls[element].value != null){
                if (typeof(this.form.controls[element].value) == 'string'){
                    valuesAssigned.push(this.form.controls[element].value);
                } else {
                    valuesAssigned = valuesAssigned.concat(this.form.controls[element].value);
                }
            }
        });

        console.log("***** Assigned values are", valuesAssigned);
        
        this.availableColumns = this.columns.filter(item => valuesAssigned.indexOf(item) == -1);
       console.log("******* UPDATA COLUMNS: ", this.columns.filter(item => valuesAssigned.indexOf(item) == -1));


    }

}
