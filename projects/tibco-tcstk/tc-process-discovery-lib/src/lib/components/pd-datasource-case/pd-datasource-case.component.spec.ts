import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdDatasourceCaseComponent } from './pd-datasource-case.component';

describe('PdDatasourceCaseComponent', () => {
  let component: PdDatasourceCaseComponent;
  let fixture: ComponentFixture<PdDatasourceCaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdDatasourceCaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdDatasourceCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
