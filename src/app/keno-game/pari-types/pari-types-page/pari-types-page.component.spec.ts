import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PariTypesPageComponent } from './pari-types-page.component';

describe('PariTypesPageComponent', () => {
  let component: PariTypesPageComponent;
  let fixture: ComponentFixture<PariTypesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PariTypesPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PariTypesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
