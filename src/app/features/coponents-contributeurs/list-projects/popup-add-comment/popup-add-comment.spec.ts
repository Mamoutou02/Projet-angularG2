import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupAddComment } from './popup-add-comment';

describe('PopupAddComment', () => {
  let component: PopupAddComment;
  let fixture: ComponentFixture<PopupAddComment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupAddComment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupAddComment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
