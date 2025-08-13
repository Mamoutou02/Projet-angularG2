import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageFonctionnaliteGestionnaire } from './page-fonctionnalite-gestionnaire';

describe('PageFonctionnaliteGestionnaire', () => {
  let component: PageFonctionnaliteGestionnaire;
  let fixture: ComponentFixture<PageFonctionnaliteGestionnaire>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageFonctionnaliteGestionnaire]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageFonctionnaliteGestionnaire);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
