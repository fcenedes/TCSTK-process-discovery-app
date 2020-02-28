import { Component, OnInit, Input } from '@angular/core';
import { PdPDataVirtualizationConfigService } from '../../services/pd-data-virtualization-config.service';
import { FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { DataVirtualizationSite, DataVirtualizationDatabase, DataVirtualizationTable } from '../../models/tc-data-virtualization-config';

@Component({
  selector: 'pd-new-datasource-tdv',
  templateUrl: './pd-new-datasource-tdv.component.html',
  styleUrls: ['./pd-new-datasource-tdv.component.css']
})
export class PdNewDatasourceTDVComponent implements OnInit {

  @Input() form: FormGroup;

  public sites: DataVirtualizationSite[];
  public databases: DataVirtualizationDatabase[];
  public tables: DataVirtualizationTable[];

  @Input() data;
  @Input() columns: string[];

  constructor(private dvService: PdPDataVirtualizationConfigService) { }

  ngOnInit() {
    this.form.get('username').valueChanges.pipe(
      debounceTime(500)
    ).subscribe(val => {
      this.getSites();
    })

    this.form.get('password').valueChanges.pipe(
      debounceTime(500)
    ).subscribe(val => {
      this.getSites();
    })

    this.form.get('site').valueChanges.subscribe(val => {
      this.getDatabases(this.form.get('site').value);
      this.form.get('domain').setValue(this.form.get('site').value.domain);
    })

    this.form.get('database').valueChanges.subscribe(val => {
      this.getTables(this.form.get('database').value);
    })

  }

  public getSites = (): void => {

    if (this.form.get('username').value && this.form.get('password').value) {
      this.sites = [];
      this.dvService.getSites("https://oocto.api.mashery.com", "443", this.form.get('username').value, this.form.get('password').value).subscribe(sites => {
        this.sites = sites;
      })
    }
  }

  public getDatabases = (site: any) : void => {

    this.databases = [];
    this.tables = [];
    this.dvService.getDatabases("https://oocto.api.mashery.com", "443", this.form.get('username').value, this.form.get('password').value, site.name).subscribe(databases => {
      this.databases = databases;
    })
  }

  public getTables = (database: any): void => {

    this.tables = [];
    this.dvService.getTables("https://oocto.api.mashery.com", "443", this.form.get('username').value, this.form.get('password').value, database.id).subscribe(tables => {
      this.tables = tables;
    })
  }
}
