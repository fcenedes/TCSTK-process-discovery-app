import { Component, Input, Output, EventEmitter } from '@angular/core';
import { LiveAppsDocumentsComponent } from '@tibco-tcstk/tc-liveapps-lib';

@Component({
  selector: 'tcpd-pd-list-documents',
  templateUrl: './pd-list-documents.component.html',
  styleUrls: ['./pd-list-documents.component.css']
})
export class PdListDocumentsComponent extends LiveAppsDocumentsComponent {

  @Input() extension: string
  @Output() selectedDocument: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    super.ngOnInit();
  }

  public handleClicked= (document: any): void => {
    this.selectedDocument.emit(document);
  }

}
