import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailIdeeProjet } from './detail-idee-projet';

describe('DetailIdeeProjet', () => {
  let component: DetailIdeeProjet;
  let fixture: ComponentFixture<DetailIdeeProjet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailIdeeProjet]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailIdeeProjet);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
