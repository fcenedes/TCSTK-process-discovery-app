import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdCaseCockpitComponent } from './pd-case-cockpit.component';

describe('PdCaseCockpitComponent', () => {
  let component: PdCaseCockpitComponent;
  let fixture: ComponentFixture<PdCaseCockpitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdCaseCockpitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdCaseCockpitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
