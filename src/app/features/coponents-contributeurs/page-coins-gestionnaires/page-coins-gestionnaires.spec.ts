import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageCoinsGestionnaires } from './page-coins-gestionnaires';

describe('PageCoinsGestionnaires', () => {
  let component: PageCoinsGestionnaires;
  let fixture: ComponentFixture<PageCoinsGestionnaires>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageCoinsGestionnaires]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageCoinsGestionnaires);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
