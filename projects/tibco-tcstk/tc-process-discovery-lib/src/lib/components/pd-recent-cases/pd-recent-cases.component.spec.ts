import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdRecentCasesComponent } from './pd-recent-cases.component';

describe('PdRecentCasesComponent', () => {
  let component: PdRecentCasesComponent;
  let fixture: ComponentFixture<PdRecentCasesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdRecentCasesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdRecentCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
