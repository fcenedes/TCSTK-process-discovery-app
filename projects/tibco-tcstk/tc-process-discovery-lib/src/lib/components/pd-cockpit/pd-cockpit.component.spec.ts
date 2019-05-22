import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdCockpitComponent } from './pd-cockpit.component';

describe('PdCockpitComponent', () => {
  let component: PdCockpitComponent;
  let fixture: ComponentFixture<PdCockpitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdCockpitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdCockpitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
