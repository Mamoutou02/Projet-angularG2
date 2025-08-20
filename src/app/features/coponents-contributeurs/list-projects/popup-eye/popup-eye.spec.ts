import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupEye } from './popup-eye';

describe('PopupEye', () => {
  let component: PopupEye;
  let fixture: ComponentFixture<PopupEye>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupEye]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupEye);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
