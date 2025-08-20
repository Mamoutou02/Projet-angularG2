import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesProjetContributeurs } from './mes-projet-contributeurs';

describe('MesProjetContributeurs', () => {
  let component: MesProjetContributeurs;
  let fixture: ComponentFixture<MesProjetContributeurs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MesProjetContributeurs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MesProjetContributeurs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
