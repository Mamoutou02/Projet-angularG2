import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BadgesPopup } from './badges-popup';

describe('BadgesPopup', () => {
  let component: BadgesPopup;
  let fixture: ComponentFixture<BadgesPopup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BadgesPopup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BadgesPopup);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
