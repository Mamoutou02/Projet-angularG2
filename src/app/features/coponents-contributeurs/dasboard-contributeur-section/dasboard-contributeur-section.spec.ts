import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DasboardContributeurSection } from './dasboard-contributeur-section';

describe('DasboardContributeurSection', () => {
  let component: DasboardContributeurSection;
  let fixture: ComponentFixture<DasboardContributeurSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DasboardContributeurSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DasboardContributeurSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
