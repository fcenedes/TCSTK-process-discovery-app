import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Location } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataVirtualizationSite, DataVirtualizationDatabase, DataVirtualizationTable, DataVirtualizationColumn } from '../models/tc-data-virtualization-config';

@Injectable({
  providedIn: 'root'
})
export class PdPDataVirtualizationConfigService {

  constructor(
    private http: HttpClient
  ) { }


  public getSites(hostname: string, port: string, username: string, password: string): Observable<DataVirtualizationSite[]> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(username + ':' + password)
      })
    };

    return this.http.get(hostname + ':' + port + '/tdv/rest/v2/sites' + '?api_key=r4duphqkgagc6rc83fptq9g3', httpOptions).pipe(
      map((value: any[]) => {
        const sites: DataVirtualizationSite[] = [];
        value.forEach(element => {
          sites.push(new DataVirtualizationSite().deserialize(element));
        })
        return sites;
      })
    );
  }

  public getDatabases(hostname: string, port: string, username: string, password: string, site: string): Observable<DataVirtualizationDatabase[]> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(username + ':' + password)
      })
    };

    const body = {
      "query": "select DATASOURCE_ID, BD_DATASOURCE_NAME, BD_DATASOURCE_TYPE \"RESOURCE_TYPE\", BD_PARENT_PATH, ANNOTATION, SITE_NAME, guid, DATASOURCE_CREATION_TIMESTAMP, DATASOURCE_MODIFICATION_TIMESTAMP, LAST_MODIFICATION_TIMESTAMP " +
                "from ALL_DATASOURCES " +
                "where SITE_NAME = '" + site + "' and BD_DATASOURCE_TYPE = 'database' and cast(BD_PARENT_PATH AS varchar) = '/" + site + "/services/databases' ORDER BY lower(BD_DATASOURCE_NAME) ASC ",
      "standardSQL": "true"
    }

    return this.http.post(hostname + ':' + port + '/tdv/rest/v2/data/typed' + '?api_key=r4duphqkgagc6rc83fptq9g3', body, httpOptions).pipe(
      map((value: any[]) => {
        const databases: DataVirtualizationDatabase[] = [];
        value.forEach(element => {
          databases.push(new DataVirtualizationDatabase().deserialize(element))
        })
        return databases;
      })
    );
  }

  public getTables(hostname: string, port: string, username: string, password: string, database: string): Observable<DataVirtualizationTable[]> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(username + ':' + password)
      })
    };

    const body = {
      "query": "select TABLE_ID \"RESOURCE_ID\", TABLE_NAME \"RESOURCE_NAME\", BD_TABLE_TYPE \"RESOURCE_TYPE\", BD_PARENT_PATH, ANNOTATION, SITE_NAME, guid from ALL_TABLES  WHERE DATASOURCE_ID = " + database + " and SCHEMA_ID is NULL and CATALOG_ID is NULL",
      "standardSQL": "true"
    }

    return this.http.post(hostname + ':' + port + '/tdv/rest/v2/data/typed' + '?api_key=r4duphqkgagc6rc83fptq9g3', body, httpOptions).pipe(
      map((value: any[]) => {
        const tables: DataVirtualizationTable[] = [];
        value.forEach(element => {
          tables.push(new DataVirtualizationTable().deserialize(element))
        })
        return tables;
      })
    );
  }

  public getColumns = (hostname: string, port: string, username: string, password: string, database: string): Observable<DataVirtualizationColumn[]> => {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(username + ':' + password)
      })
    };

    const body = {
      "query": "SELECT distinct c.COLUMN_ID, c.COLUMN_NAME, 'COLUMN' \"RESOURCE_TYPE\", c.BD_PARENT_PATH, c.ANNOTATION, listagg(i.INDEX_TYPE, ',') WITHIN GROUP (ORDER BY i.INDEX_TYPE) \"INDEX_TYPE\", c.DATA_TYPE, c.COLUMN_LENGTH, c.COLUMN_PRECISION, c.COLUMN_SCALE, f.FK_NAME  , F.PK_TABLE_ID, F.PK_TABLE_NAME, c.TABLE_ID, c.ORDINAL_POSITION  FROM ALL_COLUMNS c     LEFT JOIN ALL_INDEXES i     ON i.TABLE_ID = c.TABLE_ID and i.COLUMN_NAME = c.COLUMN_NAME     LEFT JOIN ALL_FOREIGN_KEYS f     ON f.FK_TABLE_ID = c.TABLE_ID and f.FK_COLUMN_NAME = c.COLUMN_NAME WHERE c.TABLE_ID=" + database + "  GROUP BY     c.COLUMN_ID, c.COLUMN_NAME, c.BD_PARENT_PATH, c.ANNOTATION, c.DATA_TYPE, c.COLUMN_LENGTH,    c.COLUMN_PRECISION, c.COLUMN_SCALE, f.FK_NAME, F.PK_TABLE_ID, F.PK_TABLE_NAME, c.TABLE_ID, c.ORDINAL_POSITION  order by c.ORDINAL_POSITION ASC",
      "standardSQL": "true"
    }

    return this.http.post(hostname + ':' + port + '/tdv/rest/v2/data/typed' + '?api_key=r4duphqkgagc6rc83fptq9g3', body, httpOptions).pipe(
      map((value: any[]) => {
        const columns: DataVirtualizationColumn[] = [];
        value.forEach(element => {
          columns.push(new DataVirtualizationColumn().deserialize(element))
        })
        return columns;
      })
    );
  }

  public getPreview = (hostname: string, port: string, username: string, password: string, database: string, columns: DataVirtualizationColumn[], numRows: number): Observable<string[]> => {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(username + ':' + password)
      })
    };

    const regExp = new RegExp('^[a-zA-Z0-9]*$', 'g');

    const selectStmt = columns.map((column: DataVirtualizationColumn) => {
      if (column.name.match(regExp)) {
        return column.name;
      } else {
        return '\"' + column.name + '\"';
      }
    }).join(', ');

    const body = {
      "query": "SELECT " + selectStmt + " FROM " + database + " offset 0 rows  fetch next " + numRows + " rows only",
      //    "query": "SELECT eventid , \"case spend area text\" , \"case company\" , \"case document type\" , \"case sub spend area text\" , \"case purchasing document\" , \"case purch. doc. category name\" , \"case vendor\" , \"case item type\" , \"case item category\" , \"case spend classification text\" , \"case source\" , \"case name\" , \"case gr-based inv. verif.\" , \"case item\" , \"case concept:name\" , \"case goods receipt\" , \"event user\" , \"event org:resource\" , \"event concept:name\" , \"event cumulative net worth (eur)\" , \"event time:timestamp\"  FROM /\"18.211.152.10_9400\"/services/databases/redshift/bpi_challenge offset 0 rows  fetch next " + numRows + " rows only",
      "standardSQL": "false",
      "system": "false"
    }

    return this.http.post(hostname + ':' + port + '/tdv/rest/v2/data/typed' + '?api_key=r4duphqkgagc6rc83fptq9g3', body, httpOptions).pipe(
      map((value: any[]) => {
        return value;
      })
    );

  }
}
