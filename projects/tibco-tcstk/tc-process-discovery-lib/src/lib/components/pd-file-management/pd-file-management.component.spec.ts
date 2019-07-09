import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdFileManagementComponent } from './pd-file-management.component';

describe('PdFileManagementComponent', () => {
  let component: PdFileManagementComponent;
  let fixture: ComponentFixture<PdFileManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdFileManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdFileManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
