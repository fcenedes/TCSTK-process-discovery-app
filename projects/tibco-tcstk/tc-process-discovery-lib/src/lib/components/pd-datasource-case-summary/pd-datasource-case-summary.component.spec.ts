import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdDatasourceCaseSummaryComponent } from './pd-datasource-case-summary.component';

describe('PdDatasourceCaseSummaryComponent', () => {
  let component: PdDatasourceCaseSummaryComponent;
  let fixture: ComponentFixture<PdDatasourceCaseSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdDatasourceCaseSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdDatasourceCaseSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
