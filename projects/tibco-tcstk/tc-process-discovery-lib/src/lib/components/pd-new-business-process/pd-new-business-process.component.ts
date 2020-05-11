import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { parse } from 'papaparse';
import { LiveAppsService } from '@tibco-tcstk/tc-liveapps-lib';
import { map } from 'rxjs/operators';
import { MatSnackBar, MatStepper } from '@angular/material';
import { FileNode } from '../pd-new-business-process-grouping/pd-new-business-process-grouping.component';
import { PdPDataVirtualizationConfigService } from '../../services/pd-data-virtualization-config.service';
import { DataVirtualizationColumn } from '../../models/tc-data-virtualization-config';

@Component({
  selector: 'pd-new-business-process',
  templateUrl: './pd-new-business-process.component.html',
  styleUrls: ['./pd-new-business-process.component.css']
})
export class PdNewBusinessProcessComponent implements OnInit {

  public generalSelection: FormGroup;
  public sourceSelection: FormGroup;
  public parseOptions: FormGroup;
  public mapping: FormGroup;
  public grouping: FormGroup;

  public avActivities: FileNode[] = [];

  // For data table
  public data;
  public columns;

  public caseCreated: boolean = false;

  // stepper
  isLinear = false;
  @ViewChild('stepper', { static: false }) stepper: MatStepper;
  uploadProgress: number;
  public caseURL: string = '';

  constructor(
    private liveapps: LiveAppsService,
    private dvService: PdPDataVirtualizationConfigService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.generalSelection = new FormGroup({
      analysisName: new FormControl(),
      analysisDescription: new FormControl(),
      useSuffix: new FormControl('No')
    });

    this.sourceSelection = new FormGroup({
      inputType: new FormControl(),
      file: new FormGroup({
        filename: new FormControl({ value: null, disabled: true }),
        location: new FormControl()
      }),
      tdv: new FormGroup({
        username: new FormControl(),
        password: new FormControl(),
        site: new FormControl(),
        domain: new FormControl({ value: '', disabled: true }),
        database: new FormControl(),
        table: new FormControl(),
        query: new FormControl(),
        numPartition: new FormControl(),
        primaryKey: new FormControl()
      })
    });
    this.sourceSelection.get('file').get('location').valueChanges.subscribe( value => {
      this.data = undefined;
      this.columns = [];
      this.parseFile(value, false);
    });
    this.sourceSelection.get('tdv').get('table').valueChanges.subscribe(value => {
      this.data = undefined;
      this.columns = [];
      this.obtainTDVPreview();
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
  }

  public parseFile = (file: string, useStep: boolean): void => {

    const config = this.obtainParseOptions(useStep);

    if (this.sourceSelection.get('inputType').value === 'csv') {
      parse(file, config)
    }
  }

  private obtainParseOptions = (useStep: boolean): any => {
    let config = {
      quoteChar: this.parseOptions.get('quoteChar').value,
      escapeChar: this.parseOptions.get('escapeChar').value,
      header: this.parseOptions.get('useFirstRowAsHeader').value,
      preview: this.parseOptions.get('numberRowsForPreview').value,
      encoding: this.parseOptions.get('encoding').value,
      comments: (this.parseOptions.get('skipComments').value) ? this.parseOptions.get('comments').value : '',
      skipEmptyLines: this.parseOptions.get('skipEmptyLines').value,
      download: true,
      complete: (result) => {
        this.columns = this.calculateColumnNames(
          this.parseOptions.get('useFirstRowAsHeader').value ? Object.keys(result.data[0]).length : result.data[0].length,
          this.parseOptions.get('useFirstRowAsHeader').value ? result.meta.fields : undefined);
        this.data = result.data;
        this.parseOptions.get('columnSeparator').setValue(result.meta.delimiter);
      },
    };

    if (useStep) {
      config['step'] = (results, parser) => {

        const myValue = this.avActivities.filter(entry => { return entry.name === results.data[this.mapping.controls.activity.value] });

        if (myValue.length === 0) {
          const element = new FileNode();
          element.name = results.data[this.mapping.controls.activity.value];
          element.isParent = false;
          this.avActivities.push(element);
        }
        if (results.errors.length > 0) {
          console.log("*********** Error while processing the file", results.errors);
        }
      };
      config['preview'] = 0;
      config['complete'] = undefined;
    }
    return config;

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

              this.liveapps.runProcess(sandboxId, pdConfiguration.datasourceAppId, pdConfiguration.validateActionAppId, caseReference, this.case).
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
    const caseData = {
      DiscoverAnalysis: {
        Name: this.generalSelection.get('analysisName').value,
        Description: this.generalSelection.get('analysisDescription').value,
        InputType: this.sourceSelection.get('inputType').value,
        Columns: this.columns,
        Datasource: {},
        EventMap: {
          case_id: this.mapping.get('caseId').value,
          activity_id: this.mapping.get('activity').value,
          resource_id: this.mapping.get('resource').value,
          activity_start_time: this.mapping.get('start').value,
          activity_end_time: this.mapping.get('end').value,
          otherAttributes: this.mapping.get('other').value ? this.mapping.get('other').value.toString() : undefined
        },
        Spotfire: {
          AddSuffix_1: this.generalSelection.get('useSuffix').value
        },
        Organisation: 'oocto2'
      }
    };

    if (this.sourceSelection.get('inputType').value === 'json' || this.sourceSelection.get('inputType').value === 'csv'){
      caseData.DiscoverAnalysis.Datasource['File'] = {
        FileName: this.sourceSelection.get('file').get('filename').value,
        FilePath: this.sourceSelection.get('file').get('location').value,
        DateTimeFormat: this.parseOptions.get('dateTimeFormat').value,
        Encoding: this.parseOptions.get('encoding').value,
        EscapeChar: this.parseOptions.get('escapeChar').value,
        QuoteChar: this.parseOptions.get('quoteChar').value,
        Separator: this.parseOptions.get('columnSeparator').value,
        UseFirstLineAsHeader: this.parseOptions.get('useFirstRowAsHeader').value ? 'true' : 'false'
      }
    }

    if (this.sourceSelection.get('inputType').value === 'tdv') {
      caseData.DiscoverAnalysis.Datasource['TDV'] = {
        Endpoint: this.sourceSelection.get('tdv').get('site').value.host + ':' + '9401', // this.sourceSelection.get('tdv').get('site').value.port,
        Site: this.sourceSelection.get('tdv').get('site').value.name,
        Domain: this.sourceSelection.get('tdv').get('domain').value,
        Database: this.sourceSelection.get('tdv').get('database').value.name,
        Table: this.sourceSelection.get('tdv').get('table').value.name,
        // Username: this.sourceSelection.get('tdv').get('username').value,
        // Password: this.sourceSelection.get('tdv').get('password').value,
        Query: '',
        PrimaryKey: '',
        Partitions: 0,
        DataTimeFormat: this.parseOptions.get('dateTimeFormat').value,
      }
    }
    return caseData;
  }

  public moveNextTab = (): void => {
    if (this.sourceSelection.get('inputType').value !== 'tdv') {
      // Preview and columns for CSV and JSON format
      if (!this.data && this.parseOptions.get('preview').value) {
        this.parseFile(this.sourceSelection.get('file').get('location').value, false);
      }
    } else {
      // Preview and columns for TDV format
      this.obtainTDVPreview();
    }
    this.stepper.next();
  }

  public obtainTDVPreview = (): void =>{
    const tdv = this.sourceSelection.get('tdv');
    this.dvService.getColumns("https://oocto.api.mashery.com", "443", tdv.get('username').value, tdv.get('password').value, tdv.get('table').value.id).subscribe((columns: DataVirtualizationColumn[]) => {
      const result = columns.map(element => element.name);
      this.columns = result;
      this.dvService.getPreview("https://oocto.api.mashery.com", "443", tdv.get('username').value, tdv.get('password').value, tdv.get('table').value.parentPath + '/' + tdv.get('table').value.name, columns, this.parseOptions.get('numberRowsForPreview').value).subscribe(rows => {
        let newRows: any[] = [];
        newRows = rows.map(row => {
          let newRow = {};
          for (let index = 0; index < row.length; index++) {
            const element = row[index];
            newRow[this.columns[index]] = element;
          }
          return newRow;
        });
        this.data = newRows;
      })
    })
  }

  public refreshPreview = (): void => {
    if (this.parseOptions.get('preview').value) {
      if (this.sourceSelection.get('inputType').value === 'csv' || this.sourceSelection.get('inputType').value === 'json'){
        this.parseFile(this.sourceSelection.get('file').get('location').value, false);
      }
      if (this.sourceSelection.get('inputType').value === 'tdv') {
        this.obtainTDVPreview();
      }

    }
  }
}
