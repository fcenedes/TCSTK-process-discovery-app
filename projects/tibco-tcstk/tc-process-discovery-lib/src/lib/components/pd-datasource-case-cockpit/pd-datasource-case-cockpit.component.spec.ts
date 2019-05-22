import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdDatasourceCaseCockpitComponent } from './pd-datasource-case-cockpit.component';

describe('PdDatasourceCaseCockpitComponent', () => {
  let component: PdDatasourceCaseCockpitComponent;
  let fixture: ComponentFixture<PdDatasourceCaseCockpitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdDatasourceCaseCockpitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdDatasourceCaseCockpitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
