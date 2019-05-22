import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdDatasourcesAdministrationComponent } from './pd-datasources-administration.component';

describe('PdSettingsAdministrationComponent', () => {
    let component: PdDatasourcesAdministrationComponent;
    let fixture: ComponentFixture<PdDatasourcesAdministrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [PdDatasourcesAdministrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
      fixture = TestBed.createComponent(PdDatasourcesAdministrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
