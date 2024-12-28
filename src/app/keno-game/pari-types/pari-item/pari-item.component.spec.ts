import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PariItemComponent } from './pari-item.component';

describe('PariItemComponent', () => {
  let component: PariItemComponent;
  let fixture: ComponentFixture<PariItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PariItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PariItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
