import { Component, OnInit, EventEmitter } from '@angular/core';
import { MessageQueueService } from '@tibco-tcstk/tc-core-lib';
import { TcDocumentService, Document, DocumentAction } from '@tibco-tcstk/tc-liveapps-lib';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';


@Component({
    selector: 'tcpd-pd-file-management',
    templateUrl: './pd-file-management.component.html',
    styleUrls: ['./pd-file-management.component.css']
})
export class PdFileManagementComponent implements OnInit {

    public FOLDERID = 'datasources';

    public documents: Document[];
    public  customActions: string[]

    constructor(
        private messageService: MessageQueueService,
        private documentService: TcDocumentService,
        public dialog: MatDialog,
        private router: Router
    ) { }

    ngOnInit() {
        this.messageService.sendMessage('title-bar', 'file-management');
        // this.listFiles();
        this.customActions = ['Create business process'];
    }

    createNewDatasource() {
        this.router.navigate(['/starterApp/pd/new-datasource'], {});
    }

    manageCustomAction($event: DocumentAction){
        this.router.navigate(['/starterApp/pd/new-datasource',
            {
                documentName: $event.document.name,
                documentExtension: $event.document.extension,
                documentURL: window.location.protocol + '//' + window.location.host + this.documentService.getUrlForDocument('orgFolders', this.FOLDERID, $event.document.name, null, 31)
            }
        ], {});        
    }
}
