import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnsembleContributionsContributeurs } from './ensemble-contributions-contributeurs';

describe('EnsembleContributionsContributeurs', () => {
  let component: EnsembleContributionsContributeurs;
  let fixture: ComponentFixture<EnsembleContributionsContributeurs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnsembleContributionsContributeurs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnsembleContributionsContributeurs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
