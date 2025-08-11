import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupComments } from './popup-comments';

describe('PopupComments', () => {
  let component: PopupComments;
  let fixture: ComponentFixture<PopupComments>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupComments]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupComments);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
