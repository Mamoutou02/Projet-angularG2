import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinsSection } from './coins-section';

describe('CoinsSection', () => {
  let component: CoinsSection;
  let fixture: ComponentFixture<CoinsSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoinsSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoinsSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
