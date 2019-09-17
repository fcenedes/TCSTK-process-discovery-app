import { Component, OnInit } from '@angular/core';
import { parse, unparse } from 'papaparse';
import { LiveAppsService, Process } from '@tibco-tcstk/tc-liveapps-lib';
import { PdProcessDiscoveryService } from '../../services/pd-process-discovery.service';
import { ProcessDiscoveryConfig } from '../../models/tc-process-discovery-config';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpEventType } from '@angular/common/http';
import { MatSnackBar, MatStepper, MatSelectChange } from '@angular/material';

import { MessageQueueService } from '@tibco-tcstk/tc-core-lib';
// import * as moment from 'moment';

import { LocalDateTime, DateTimeFormatter } from 'js-joda';

export interface Mapping {
    columnName: string,
    options: string[]    
}

@Component({
    selector: 'tcpd-pd-new-datasource',
    templateUrl: './pd-new-datasource.component.html',
    styleUrls: ['./pd-new-datasource.component.css']
})
export class PdNewDatasourceComponent implements OnInit {

    // Internal fields
    public sandboxId: number;
    private pdConfiguration: ProcessDiscoveryConfig;

    // 
    public datasourceType: string;
    public file: File;
    public filename: string = '';
    public data;
    public displayedColumns: string[];
    public mapping: Mapping[] = [];

    // Field to start the case
    public analysisName: string;
    public analysisDescription: string;
    public inputType: string = ''; 

    // Options for parsing
    public useFirstRowAsHeader: boolean = true;
    public skipComments: boolean = false;
    public comments: string = '//'
    public columnSeparator: string;
    public preview: boolean = true;
    public numberRowsForPreview: number = 5;
    public skipEmptyLines: boolean = true;
    public encoding: string = 'UTF-8';
    public dateTimeFormat: string = 'yyyy-MM-dd HH:mm:ss.SSS';
    public quoteChar: string = '"';
    public escapeChar: string = '"';
    public remote: boolean = false;

    // JDBC
    // public jdbcUsername: string;
    // public jdbcPassword: string;
    // public jdbcType: string;
    // public jdbcHostname: string;
    // public jdbcPort: number;
    // public jdbcDatabaseName: string;
    // public jdbcSQLQuery: string;
    
    // Mappings
    public caseId: string;
    public activity: string;
    public start: string;
    public end: string;
    public resource: string[];
    public other: string[];

    // stepper
    isLinear = false;

    // Other options
    public previewStart: string;
    public previewEnd: string;
    public useSuffix: string = 'No';

    private action: Process;
    private creator: Process;

    // Upload
    private MAX_RETRIES: number = 3;
    private num_retries: number = 0;
    private case;
    public uploadProgress: number = 0;
    public showButton: boolean = true;
    public showRetryButton: boolean = false;

    private caseIdentifier: string;
    private caseReference: string;


    constructor(
        private liveapps: LiveAppsService, 
        private pdService: PdProcessDiscoveryService,
        private route: ActivatedRoute,
        private router: Router,
        private snackBar: MatSnackBar,
        private messageService: MessageQueueService
    ) { }

    ngOnInit() {
        this.messageService.sendMessage('title-bar', 'new-datasource');

        this.sandboxId = Number(this.route.snapshot.data.claims.primaryProductionSandbox.id).valueOf();
        this.pdConfiguration = this.route.snapshot.data.processDiscovery;
        this.liveapps.getCaseTypeSchema(this.sandboxId, this.pdConfiguration.datasourceAppId, 100).pipe(
            map(types => {
                const app = types.casetypes.filter(casetype => casetype.id === '1')[0];
                this.creator = app.creators.filter(creator => creator.id === this.pdConfiguration.creatorAppId)[0];
                this.action = app.actions.filter(action => action.id === this.pdConfiguration.validateActionAppId)[0];
                console.log("+ ", JSON.stringify(this.creator));
            })
        );

        if (this.route.snapshot.params.documentName){
            this.inputType = this.route.snapshot.params.documentExtension;
            this.filename = this.route.snapshot.params.documentName;
            this.remote = true;
        }
    }

    public calculateColumnNames = (numColumns: number, columnNames: string[]): string[] => {
        let newColumnNames: string[] = [];

        for (let index = 0; index < numColumns; index++){
            const columnName = this.useFirstRowAsHeader ? columnNames[index] : '' + index;
            const newElement: Mapping = {
                columnName: columnName,
                options: []
            };
            this.mapping.push(newElement);
            newColumnNames.push(columnName);
        }
        return newColumnNames;
    }

    public onFileSelect = (fileList: File[]): void => {
        this.file = fileList[0];
        this.filename = this.file.name;
    }

    public moveNextTab = (currentTab: number): void => {
        if (currentTab == 1 && this.preview && this.inputType === 'csv'){
            this.refreshCSV();
        }
        if (currentTab == 1 && this.preview && this.inputType === 'json') {
            this.refreshJSON();
        }

        if (currentTab == 3){
            if (this.start != undefined) {
                this.previewStart = this.data[2][this.start];

            }
            if (this.end != undefined){
                this.previewEnd = this.data[2][this.end];

            }
        }
    }

    public refreshJSON = (): void => {

        // Pending to parse JSON file
        const reader = new FileReader();
        reader.onload = (data: any) => {
            const jsonData = unparse(data.target.result);

            let config = {
                quoteChar: this.quoteChar,
                escapeChar: this.escapeChar,
                header: this.useFirstRowAsHeader,
                preview: this.numberRowsForPreview,
                encoding: this.encoding,
                comments: (this.skipComments) ? this.comments: '',
                complete: (result) => {
                    this.displayedColumns = this.calculateColumnNames(
                        this.useFirstRowAsHeader ? Object.keys(result.data[0]).length: result.data[0].length, 
                        this.useFirstRowAsHeader ? result.meta.fields: undefined);
                    this.data = result.data;
                    this.columnSeparator = result.meta.delimiter;
                },
                skipEmptyLines: this.skipEmptyLines,
                download: this.remote
            };
            const result = parse(jsonData, config);
        }

        reader.readAsText(this.file);
    }

    public refreshCSV = ():void => {
        let config = {
            quoteChar: this.quoteChar,
            escapeChar: this.escapeChar,
            header: this.useFirstRowAsHeader,
            preview: this.numberRowsForPreview,
            encoding: this.encoding,
            comments: (this.skipComments) ? this.comments: '',
            complete: (result) => {
                this.displayedColumns = this.calculateColumnNames(
                    this.useFirstRowAsHeader ? Object.keys(result.data[0]).length: result.data[0].length, 
                    this.useFirstRowAsHeader ? result.meta.fields: undefined);
                this.data = result.data;
                this.columnSeparator = result.meta.delimiter;
            },
            skipEmptyLines: this.skipEmptyLines,
            download: this.remote
        };
        if (this.remote) {
            parse(this.route.snapshot.params.documentURL, config);
        } else {
            parse(this.file, config);
        }
    }

    public setComments = ($event): void => {
        if (!this.skipComments){
            this.comments = '';
        }
    }

    public enabledButtonTab = (tab: number): boolean => {

        if (tab == 1){
            // inputType not selected
            if (!this.inputType) return true;

            // inputtype = CSV
            if (this.inputType === 'csv'){
                if (this.analysisName && this.analysisDescription && this.filename) {
                    return false;
                } else {
                    return true;
                }
            }
        }
    }

    handleSubmit = (stepper: MatStepper) => {

        let uploadPath: string;
        if (!this.remote){
            uploadPath = 'this.pdConfiguration.hdfsRootPath' + ' / <folder>/' + this.file.name;
        }
        this.showButton = false;

        this.case = {
            DiscoverAnalysisConfig: {
                AnalysisName: this.analysisName,
                AnalysisDescription: this.analysisDescription,
                InputType: this.inputType,
                CSVSchema: {
                    ColumnName: this.displayedColumns
                },
                CSVOptions: {
                    headers: this.useFirstRowAsHeader ? 'true' : 'false',
                    headerBasedParser: this.useFirstRowAsHeader ? 'true' : 'false',
                    separator: this.columnSeparator,
                    quoteChar: this.quoteChar,
                    escapeChar: this.escapeChar,
                    datetimeFormat: this.dateTimeFormat,
                    encoding: this.encoding
                },
                FileOptions: {
                    FileName: this.filename,
                    FilePath: (this.remote ? this.route.snapshot.params.documentURL : '')
                },
                EventMap: {
                    case_id: this.caseId,
                    activity_id: this.activity,
                    resource_id: this.resource,
                    activity_start_time: this.start,
                    activity_end_time: this.end,
                    otherAttributes: this.other ? this.other.toString(): undefined
                },
                SDSBackend: {
                    Status: '',
                    SDSProcessId: '',
                    Autocheckinterval: 2
                },
                Spotfire: {
                    AddSuffix_1: this.useSuffix
                }
            }
        }

        this.showButton = false;
        this.liveapps.runProcess(this.sandboxId, this.pdConfiguration.datasourceAppId, this.pdConfiguration.creatorAppId, undefined, this.case).
            pipe(
                map(response => {
                    if (response) {
                        if (!response.data.errorMsg) {
                            // parse data to object
                            response.data = JSON.parse(response.data);
                            // case created send back response including caseIdentifier if one is present
                            if (response.caseIdentifier) {
                                this.caseIdentifier = response.caseIdentifier;
                                // this.case.DiscoverAnalysisConfig.FileOptions.FilePath = uploadPath.replace('<folder>', this.caseIdentifier);
                            }
                            if (response.caseReference) {
                                this.caseReference = response.caseReference;
                            }
                            
                            // upload the document to the backend
                            // TODO: Review it
                            if (this.remote){
                                this.liveapps.runProcess(this.sandboxId, this.pdConfiguration.datasourceAppId, this.pdConfiguration.validateActionAppId, this.caseReference, this.case).
                                    pipe(
                                        map(_ => {
                                            stepper.next();
                                        })
                                    ).subscribe();
                            } else {
                                if (this.caseIdentifier) {
                                    this.case.DiscoverAnalysisConfig.FileOptions.FilePath = uploadPath.replace('<folder>', this.caseIdentifier);
                                }
                                this.pdService.uploadFileHDFS('this.pdConfiguration.hdfsHostname', this.caseIdentifier, 'this.pdConfiguration.hdfsRootPath', this.file).subscribe(
                                    response => {
                                        if (response.type == HttpEventType.UploadProgress) {
                                            this.uploadProgress = Math.round(100 * response.loaded / response.total);
                                        }

                                        if (this.uploadProgress == 100) {
                                            this.snackBar.open('File uploaded correctly', 'OK', {
                                                duration: 3000
                                            });
                                            this.liveapps.runProcess(this.sandboxId, this.pdConfiguration.datasourceAppId, this.pdConfiguration.validateActionAppId, this.caseReference, this.case).
                                                pipe(
                                                    map(_ => {
                                                        stepper.next();
                                                    })
                                                ).subscribe();
                                        }
                                    },
                                    error => {
                                        this.showRetryButton = true;
                                        this.snackBar.open('Error uploading file. ERROR: ' + error.message + '. Please fix the error and retry', 'OK', {
                                            duration: 10000
                                        });
                                    }
                                )
                            }
                        } else {
                            this.snackBar.open('Error create the business process.', 'OK', {
                                duration: 10000
                            });
                            console.log('****** Error creating the case: ', response);
                        }
                    }
                })
            ).subscribe(
                success => success,
                error => {
                    this.snackBar.open('Error create the business process.', 'OK', {
                        duration: 10000
                    });
                    console.log('****** Error creating the case: ', error);
                }
            );

    }

    public validateDate = (field: string, $event: MatSelectChange) => {
        let errors: number[] = [];
        const formatter = DateTimeFormatter.ofPattern(this.dateTimeFormat);
        this.data.forEach(element => {
            let parsedDate
            try {
                parsedDate = LocalDateTime.parse(element[$event.value], formatter).format(formatter);  
            } catch (error){
                if (element[$event.value] !== parsedDate) {
                    errors.push(element[$event.value]);
                }
            }
        });
        if (errors.length != 0) {
            this.snackBar.open('Error parsing date for field ' + field + ' in values: ' + errors.toString(), 'OK', {
                duration: 3000
            });
            field === 'start' ? this.start = '': this.end = '';
        }
    }
    
    handleConfirmation = (): void => {
        this.router.navigate(['/starterApp/pd/datasources']);
    }

    handleRetry(stepper: MatStepper){
        this.num_retries = this.num_retries + 1;
        if (this.num_retries < this.MAX_RETRIES) {
            // this.pdService.uploadFileHDFS('this.pdConfiguration.hdfsHostnam'e, this.caseIdentifier, 'this.pdConfiguration.hdfsRootPath', this.file).subscribe(
            //     response => {
            //         if (response.type == HttpEventType.UploadProgress) {
            //             this.uploadProgress = Math.round(100 * response.loaded / response.total);
            //         }

            //         if (this.uploadProgress == 100) {
            //             this.snackBar.open('File uploaded correctly', 'OK', {
            //                 duration: 3000
            //             });
            //             this.liveapps.runProcess(this.sandboxId, this.pdConfiguration.datasourceAppId, this.pdConfiguration.validateActionAppId, this.caseReference, this.case).
            //                 pipe(
            //                     map(_ => {
            //                         stepper.next();
            //                     })
            //                 ).subscribe();
            //         }
            //     },
            //     error => {
            //         this.snackBar.open('Error uploading file. ERROR: ' + error.message + '. Please fix the error and retry', 'OK', {
            //             duration: 10000
            //         });
            //     }
            // );
        } else {
            this.snackBar.open('Error uploading file. Please upload the file manually to ' + this.case.DiscoverAnalysisConfig.FileOptions.FilePath + ' and execute the validate action.', 'OK', {
                duration: 10000
            });
            this.router.navigate(['/starterApp/pd/datasources']);
        }
    }
}