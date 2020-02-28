import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'tcpd-pd-data-preview',
  templateUrl: './pd-data-preview.component.html',
  styleUrls: ['./pd-data-preview.component.css']
})
export class PdDataPreviewComponent implements OnInit {

  @Input() data;
  @Input() columns: string[];

  constructor() { }

  ngOnInit() {
  }

}
