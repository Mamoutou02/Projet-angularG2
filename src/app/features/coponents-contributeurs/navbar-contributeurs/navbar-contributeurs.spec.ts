import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarContributeurs } from './navbar-contributeurs';

describe('NavbarContributeurs', () => {
  let component: NavbarContributeurs;
  let fixture: ComponentFixture<NavbarContributeurs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarContributeurs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarContributeurs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
