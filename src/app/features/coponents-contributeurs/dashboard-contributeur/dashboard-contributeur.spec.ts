import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardContributeur } from './dashboard-contributeur';

describe('DashboardContributeur', () => {
  let component: DashboardContributeur;
  let fixture: ComponentFixture<DashboardContributeur>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardContributeur]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardContributeur);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
