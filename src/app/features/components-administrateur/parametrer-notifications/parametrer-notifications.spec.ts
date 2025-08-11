import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametrerNotifications } from './parametrer-notifications';

describe('ParametrerNotifications', () => {
  let component: ParametrerNotifications;
  let fixture: ComponentFixture<ParametrerNotifications>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParametrerNotifications]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParametrerNotifications);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
