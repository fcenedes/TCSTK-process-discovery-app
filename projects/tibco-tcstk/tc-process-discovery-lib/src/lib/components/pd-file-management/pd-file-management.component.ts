import { Component, OnInit } from '@angular/core';
import { MessageQueueService } from '@tibco-tcstk/tc-core-lib';
import { DocumentList, TcDocumentService, Document, LiveAppsDocumentUploadDialogComponent } from '@tibco-tcstk/tc-liveapps-lib';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';

@Component({
    selector: 'tcpd-pd-file-management',
    templateUrl: './pd-file-management.component.html',
    styleUrls: ['./pd-file-management.component.css']
})
export class PdFileManagementComponent implements OnInit {

    private FOLDERID = 'datasources';

    public documents: Document[];

    constructor(
        private messageService: MessageQueueService,
        private documentService: TcDocumentService,
        public dialog: MatDialog,
        private router: Router
    ) { }

    ngOnInit() {
        this.messageService.sendMessage('title-bar', 'file-management');
        this.listFiles();

    }

    public listFiles(): void {

        this.documentService.listDocuments('orgFolders', this.FOLDERID, 31, '')
            .pipe(
                map(documentslist => {
                    this.documents = documentslist.documents;
                })
            ).subscribe(null, error => { 
                console.log('Error', error);
                this.documentService.createOrgFolder(this.FOLDERID).pipe(
                    map(result => {
                        console.log("**** Result: ", result);
                        this.listFiles();
                    })
                ).subscribe();
            });
    }

    removeDocument(doc) {
        this.documentService.deleteDocument('orgFolders', this.FOLDERID, doc.name, 31)
            .pipe(
                map(val => {
                    this.listFiles();
                })
            )
            .subscribe(
                null, error => { 
                    console.log("**** Error");
                 });
        
    }

    createNewDatasource() {
        this.router.navigate(['/starterApp/pd/new-datasource'], {});
    }

    createDatasource(doc: Document) {
        this.router.navigate(['/starterApp/pd/new-datasource', 
            { 
                documentName: doc.name, 
                documentExtension: doc.extension,
                documentURL: this.documentService.getUrlForDocument('orgFolders', this.FOLDERID, doc.name, null, 31)
            }
        ], {});
    }

    uploadNewFile() {
        console.log("upload");
        const dialogRef = this.dialog.open(LiveAppsDocumentUploadDialogComponent, {
            width: '500px',
            data: {}
        });

        dialogRef.componentInstance.fileevent.subscribe(($e) => {
            this.uploadFile($e.file, $e.description);
        })

        dialogRef.afterClosed().subscribe(result => {
        });

        this.listFiles();
    }
    
    public fileToUpload: File = undefined;
    public fileDescription: string;

    uploadFile(fileToUpload, description) {
        this.fileToUpload = fileToUpload;
        this.fileDescription = description;
        if (this.fileToUpload) {
            this.documentService.uploadDocument('orgFolders', this.FOLDERID, 31, this.fileToUpload, this.fileToUpload.name, this.fileDescription)
                .pipe(
                    map(val => {
                        console.log(val);
                        this.listFiles();
                    })
                )
                .subscribe(
                    result => {
                        this.fileToUpload = undefined;
                        // this.uploadMessage = 'File uploaded';
                    },
                    error => { console.log('error'); });
        }
    }


}
