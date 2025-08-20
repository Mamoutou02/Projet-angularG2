import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdeeDeProjet } from './idee-de-projet';

describe('IdeeDeProjet', () => {
  let component: IdeeDeProjet;
  let fixture: ComponentFixture<IdeeDeProjet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdeeDeProjet]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IdeeDeProjet);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
