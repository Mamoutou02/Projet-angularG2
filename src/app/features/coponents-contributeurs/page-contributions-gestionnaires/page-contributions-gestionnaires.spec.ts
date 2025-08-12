import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageContributionsGestionnaires } from './page-contributions-gestionnaires';

describe('PageContributionsGestionnaires', () => {
  let component: PageContributionsGestionnaires;
  let fixture: ComponentFixture<PageContributionsGestionnaires>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageContributionsGestionnaires]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageContributionsGestionnaires);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
