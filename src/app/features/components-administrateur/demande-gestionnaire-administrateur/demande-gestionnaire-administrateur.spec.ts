import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeGestionnaireAdministrateur } from './demande-gestionnaire-administrateur';

describe('DemandeGestionnaireAdministrateur', () => {
  let component: DemandeGestionnaireAdministrateur;
  let fixture: ComponentFixture<DemandeGestionnaireAdministrateur>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemandeGestionnaireAdministrateur]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemandeGestionnaireAdministrateur);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
