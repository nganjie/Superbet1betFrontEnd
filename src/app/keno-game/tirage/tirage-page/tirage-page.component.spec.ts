import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiragePageComponent } from './tirage-page.component';

describe('TiragePageComponent', () => {
  let component: TiragePageComponent;
  let fixture: ComponentFixture<TiragePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TiragePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TiragePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
