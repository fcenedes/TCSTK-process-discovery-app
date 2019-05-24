import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdFavoriteCasesComponent } from './pd-favorite-cases.component';

describe('PdFavoriteCasesComponent', () => {
  let component: PdFavoriteCasesComponent;
  let fixture: ComponentFixture<PdFavoriteCasesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdFavoriteCasesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdFavoriteCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
