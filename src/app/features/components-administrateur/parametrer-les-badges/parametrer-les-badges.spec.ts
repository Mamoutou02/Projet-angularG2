import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametrerLesBadges } from './parametrer-les-badges';

describe('ParametrerLesBadges', () => {
  let component: ParametrerLesBadges;
  let fixture: ComponentFixture<ParametrerLesBadges>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParametrerLesBadges]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParametrerLesBadges);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
