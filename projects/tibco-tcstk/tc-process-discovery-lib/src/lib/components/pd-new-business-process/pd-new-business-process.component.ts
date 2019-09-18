import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { MessageQueueService } from '@tibco-tcstk/tc-core-lib';
import { ActivatedRoute } from '@angular/router';
import { parse, unparse } from 'papaparse';
import { LiveAppsService, TcDocumentService } from '@tibco-tcstk/tc-liveapps-lib';
import { map } from 'rxjs/operators';
import { MatSnackBar, MatStepper } from '@angular/material';
import { HttpEventType } from '@angular/common/http';
import { FileNode } from '../pd-new-business-process-grouping/pd-new-business-process-grouping.component';

// export interface Mapping {
//     columnName: string,
//     options: string[]
// }

@Component({
    selector: 'pd-new-business-process',
    templateUrl: './pd-new-business-process.component.html',
    styleUrls: ['./pd-new-business-process.component.css']
})
export class PdNewBusinessProcessComponent implements OnInit {

    public sourceSelection: FormGroup;
    public parseOptions: FormGroup;
    public mapping: FormGroup;
    public other: FormGroup;
    public grouping: FormGroup;

    public avActivities: FileNode[] = [];

    // For data table
    public data;
    public columns;
    
    public caseCreated: boolean = false;

    // stepper
    isLinear = false;
    @ViewChild('stepper', {static: false}) stepper: MatStepper;
    uploadProgress: number;
    public caseURL: string = '';

    constructor(
        private messageService: MessageQueueService,
        private liveapps: LiveAppsService, 
        private documentsService: TcDocumentService, 
        private route: ActivatedRoute,
        private snackBar: MatSnackBar
    ) { }

    ngOnInit() {
        this.messageService.sendMessage('title-bar', 'new-datasource');

        this.sourceSelection = new FormGroup({
            analysisName: new FormControl(),
            analysisDescription: new FormControl(),
            inputType: new FormControl(),
            filename: new FormControl({ value: '', disabled: true }),
            file: new FormControl()
        });

        this.parseOptions = new FormGroup({
            preview: new FormControl(true),
            useFirstRowAsHeader: new FormControl(true),
            skipComments: new FormControl(false),
            comments: new FormControl('//', Validators.maxLength(10)),
            columnSeparator: new FormControl(),
            numberRowsForPreview: new FormControl(5),
            skipEmptyLines: new FormControl(true),
            encoding: new FormControl('UTF-8'),
            dateTimeFormat: new FormControl('yyyy-MM-dd HH:mm:ss.SSS'),
            quoteChar: new FormControl('"'),
            escapeChar: new FormControl('"', Validators.maxLength(2)),
            remote: new FormControl(false)
        });

        this.mapping = new FormGroup({
            caseId: new FormControl(),
            activity: new FormControl(),
            start: new FormControl(),
            end: new FormControl(),
            resource: new FormControl(),
            other: new FormControl()

        });

        this.other = new FormGroup({
            useSuffix: new FormControl('No')
        })

        this.grouping = new FormGroup(
            {
                enable: new FormControl(false),
                // elements: new FormA({
                //     groupName: new FormControl()
                //     // activities: new FormArray()
                // })
            }
        )

        if (this.route.snapshot.params.documentName) {
            this.sourceSelection.get('inputType').setValue(this.route.snapshot.params.documentExtension);
            this.sourceSelection.get('inputType').disable();
            this.sourceSelection.get('filename').setValue(this.route.snapshot.params.documentName);
            this.sourceSelection.get('file').setValue(this.route.snapshot.params.documentURL);
            this.parseOptions.get('remote').setValue(true);
            this.parseFile(this.route.snapshot.params.documentURL);
        }

        const tempData = ['Activity 5', 'Activity 6'];

        tempData.forEach(name => {
            const element = new FileNode();
            element.name = name;
            element.isParent = false;
            this.avActivities.push(element);
        })

    }

    public parseFile = (file): void => {

        let i = 0;
        let config = {
            quoteChar: this.parseOptions.get('quoteChar').value,
            escapeChar: this.parseOptions.get('escapeChar').value,
            header: this.parseOptions.get('useFirstRowAsHeader').value,
            preview: this.parseOptions.get('numberRowsForPreview').value,
            encoding: this.parseOptions.get('encoding').value,
            comments: (this.parseOptions.get('skipComments').value) ? this.parseOptions.get('comments').value : '',
            skipEmptyLines: this.parseOptions.get('skipEmptyLines').value,
            download: this.parseOptions.get('remote').value,
            // step: function (results, parser) {
            //     console.log("Line: " + i++ + " Row data:", results.data);
            //     if (results.errors){ 
            //         console.log("*********** Abort file processing ", results.errors);
            //         parser.abort();
            //     }
            // },
            complete: (result) => {
                this.columns= this.calculateColumnNames(
                    this.parseOptions.get('useFirstRowAsHeader').value ? Object.keys(result.data[0]).length : result.data[0].length,
                    this.parseOptions.get('useFirstRowAsHeader').value ? result.meta.fields : undefined);
                this.data = result.data;
                this.parseOptions.get('columnSeparator').setValue(result.meta.delimiter);
            },
        };

        if (this.sourceSelection.get('inputType').value === 'csv') {
            parse(file, config)
        }

        if (this.sourceSelection.get('inputType').value === 'json') {
            const reader = new FileReader();
            reader.onload = (data: any) => {
                const jsonData = unparse(data.target.result);
                parse(jsonData, config);
            }

            reader.readAsText(file);
        }
    }

    private calculateColumnNames = (numColumns: number, columnNames: string[]): string[] => {
        let newColumnNames: string[] = [];

        for (let index = 0; index < numColumns; index++) {
            const columnName = this.parseOptions.get('useFirstRowAsHeader').value ? columnNames[index] : '' + index;
            newColumnNames.push(columnName);
        }
        return newColumnNames;
    }

    private case;
    public createNewBusinessProcess = (): void => {

        this.case = this.initCaseData();

        const sandboxId = Number(this.route.snapshot.data.claims.primaryProductionSandbox.id).valueOf();
        const pdConfiguration = this.route.snapshot.data.processDiscovery;
        let caseReference: string;

        this.liveapps.runProcess(sandboxId, pdConfiguration.datasourceAppId, pdConfiguration.creatorAppId, undefined, this.case).
            pipe(
                map(response => {
                    if (response) {
                        if (!response.data.errorMsg) {
                            // parse data to object
                            response.data = JSON.parse(response.data);

                            if (response.caseReference) {
                                caseReference = response.caseReference;
                                this.caseURL = '/starterApp/pd/datasource/case/' + pdConfiguration.datasourceAppId + '/1/' + caseReference;
                            }

                            if (this.parseOptions.get('remote').value) {
                                // File is already uploaded.
                                this.case.DiscoverAnalysisConfig.FileOptions.FilePath = this.sourceSelection.get('file').value;
                                this.triggerValidateAction(sandboxId, pdConfiguration.datasourceAppId, pdConfiguration.validateActionAppId, caseReference);
                            } else {
                                // File is local to the browser. Need to upload to the case
                                // Launch validate action
                                this.uploadProgress = 0;
                                this.documentsService.uploadDocument('caseFolders', caseReference, sandboxId, this.sourceSelection.get('file').value, this.sourceSelection.get('filename').value, 'File uploaded from browser.')
                                    .subscribe(
                                        (response: any) => {
                                            if (response.type === HttpEventType.UploadProgress) {
                                                this.uploadProgress = Math.round(100 * response.loaded / response.total);
                                                if (this.uploadProgress === 100) {
                                                    console.log("********** Type: " + response.type + ' Progress: ' + this.uploadProgress);
                                                    this.case.DiscoverAnalysisConfig.FileOptions.FilePath = 'https://localhost:4200/' + 'webresource/folders/' + caseReference + '/' + sandboxId + '/' + this.sourceSelection.get('filename').value;
                                                    this.triggerValidateAction(sandboxId, pdConfiguration.datasourceAppId, pdConfiguration.validateActionAppId, caseReference);
                                                }
                                            }
                                        },
                                        error => { 
                                            console.log('error'); 
                                        }
                                    );

                            }
                        } else {
                            this.snackBar.open('Error create the business process.', 'OK', {
                                duration: 10000
                            });
                        }
                    }
                })
            ).subscribe(
                success => success,
                error => {
                    this.snackBar.open('Error create the business process.', 'OK', {
                        duration: 10000
                    });
                }
            );
       

    }

    private initCaseData = (): any => {
        return {
            DiscoverAnalysisConfig: {
                AnalysisName: this.sourceSelection.get('analysisName').value,
                AnalysisDescription: this.sourceSelection.get('analysisDescription').value,
                InputType: this.sourceSelection.get('inputType').value,
                CSVSchema: {
                    ColumnName: this.columns
                },
                CSVOptions: {
                    headers: this.parseOptions.get('useFirstRowAsHeader').value ? 'true' : 'false',
                    headerBasedParser: this.parseOptions.get('useFirstRowAsHeader').value ? 'true' : 'false',
                    separator: this.parseOptions.get('columnSeparator').value,
                    quoteChar: this.parseOptions.get('quoteChar').value,
                    escapeChar: this.parseOptions.get('escapeChar').value,
                    datetimeFormat: this.parseOptions.get('dateTimeFormat').value,
                    encoding: this.parseOptions.get('encoding').value
                },
                FileOptions: {
                    FileName: this.sourceSelection.get('filename').value,
                    FilePath: (this.parseOptions.get('remote') ? this.route.snapshot.params.documentURL : '')
                },
                EventMap: {
                    case_id: this.mapping.get('caseId').value,
                    activity_id: this.mapping.get('activity').value,
                    resource_id: this.mapping.get('resource').value,
                    activity_start_time: this.mapping.get('start').value,
                    activity_end_time: this.mapping.get('end').value,
                    otherAttributes: this.mapping.get('other').value ? this.mapping.get('other').value.toString() : undefined
                },
                SDSBackend: {
                    Status: '',
                    SDSProcessId: '',
                    Autocheckinterval: 2
                },
                Spotfire: {
                    AddSuffix_1: this.other.get('useSuffix').value
                }
            }
        };
    }

    private triggerValidateAction = (sandboxId: number, datasourceAppId: string, validateActionAppId: string, caseReference: string): void => {
        this.liveapps.runProcess(sandboxId, datasourceAppId, validateActionAppId, caseReference, this.case).
        pipe(
            map(_ => {
                this.caseCreated = true;
            })
        ).subscribe(
            success => success,
            error => {
                this.snackBar.open('Error launching the validate action.', 'OK', {
                    duration: 10000
                });
            }
        );
    }

    public moveNextTab = (): void => {
        if (!this.parseOptions.get('remote').value && this.parseOptions.get('preview').value) {
            this.parseFile(this.sourceSelection.get('file').value);
        }
        this.stepper.next();
    }

    public refreshPreview = (): void => {
        if (this.parseOptions.get('preview').value) {
            this.parseFile(this.sourceSelection.get('file').value);
        }
    }
}
