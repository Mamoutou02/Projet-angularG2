import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAjoutIdee } from './form-ajout-idee';

describe('FormAjoutIdee', () => {
  let component: FormAjoutIdee;
  let fixture: ComponentFixture<FormAjoutIdee>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormAjoutIdee]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormAjoutIdee);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
