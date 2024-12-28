import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BallsContainerComponent } from './balls-container.component';

describe('BallsContainerComponent', () => {
  let component: BallsContainerComponent;
  let fixture: ComponentFixture<BallsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BallsContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BallsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
