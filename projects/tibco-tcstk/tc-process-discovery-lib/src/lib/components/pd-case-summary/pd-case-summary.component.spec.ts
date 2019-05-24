import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdCaseSummaryComponent } from './pd-case-summary.component';

describe('PdCaseSummaryComponent', () => {
  let component: PdCaseSummaryComponent;
  let fixture: ComponentFixture<PdCaseSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdCaseSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdCaseSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
