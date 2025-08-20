import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DasboardContributeurs } from './dasboard-contributeurs';

describe('DasboardContributeurs', () => {
  let component: DasboardContributeurs;
  let fixture: ComponentFixture<DasboardContributeurs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DasboardContributeurs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DasboardContributeurs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
