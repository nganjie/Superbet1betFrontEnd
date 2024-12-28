import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BetGetSavePageComponent } from './bet-get-save-page.component';

describe('BetGetSavePageComponent', () => {
  let component: BetGetSavePageComponent;
  let fixture: ComponentFixture<BetGetSavePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BetGetSavePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BetGetSavePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
