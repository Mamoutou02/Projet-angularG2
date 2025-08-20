import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupActions } from './popup-actions';

describe('PopupActions', () => {
  let component: PopupActions;
  let fixture: ComponentFixture<PopupActions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupActions]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupActions);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
