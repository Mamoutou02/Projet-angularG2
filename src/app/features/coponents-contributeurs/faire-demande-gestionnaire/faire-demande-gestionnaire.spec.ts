import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaireDemandeGestionnaire } from './faire-demande-gestionnaire';

describe('FaireDemandeGestionnaire', () => {
  let component: FaireDemandeGestionnaire;
  let fixture: ComponentFixture<FaireDemandeGestionnaire>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FaireDemandeGestionnaire]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FaireDemandeGestionnaire);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
