import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'tcpd-pd-settings-tdv',
  templateUrl: './pd-settings-tdv.component.html',
  styleUrls: ['./pd-settings-tdv.component.css']
})
export class PdSettingsTdvComponent implements OnInit {

  public form: FormGroup;
  constructor() { }

  ngOnInit() {

    this.form = new FormGroup({
      host: new FormControl(),
      port: new FormControl(),
      username: new FormControl(),
      password: new FormControl(),
      apiKey: new FormControl(),
    })
  }

  public runSaveFuntion = (): void => {

  }

}
