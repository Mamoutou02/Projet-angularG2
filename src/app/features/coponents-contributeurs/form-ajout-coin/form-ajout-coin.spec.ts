import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAjoutCoin } from './form-ajout-coin';

describe('FormAjoutCoin', () => {
  let component: FormAjoutCoin;
  let fixture: ComponentFixture<FormAjoutCoin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormAjoutCoin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormAjoutCoin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
