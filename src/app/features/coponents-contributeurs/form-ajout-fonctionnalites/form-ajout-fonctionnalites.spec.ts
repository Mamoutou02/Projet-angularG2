import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAjoutFonctionnalites } from './form-ajout-fonctionnalites';

describe('FormAjoutFonctionnalites', () => {
  let component: FormAjoutFonctionnalites;
  let fixture: ComponentFixture<FormAjoutFonctionnalites>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormAjoutFonctionnalites]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormAjoutFonctionnalites);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
