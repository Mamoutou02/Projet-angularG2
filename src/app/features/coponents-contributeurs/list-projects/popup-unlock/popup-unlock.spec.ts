import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupUnlock } from './popup-unlock';

describe('PopupUnlock', () => {
  let component: PopupUnlock;
  let fixture: ComponentFixture<PopupUnlock>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupUnlock]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupUnlock);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
