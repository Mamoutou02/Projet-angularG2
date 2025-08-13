import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageDemandesGestionnaires } from './page-demandes-gestionnaires';

describe('PageDemandesGestionnaires', () => {
  let component: PageDemandesGestionnaires;
  let fixture: ComponentFixture<PageDemandesGestionnaires>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageDemandesGestionnaires]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageDemandesGestionnaires);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
