import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarContributeurs } from './sidebar-contributeurs';

describe('SidebarContributeurs', () => {
  let component: SidebarContributeurs;
  let fixture: ComponentFixture<SidebarContributeurs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarContributeurs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarContributeurs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
