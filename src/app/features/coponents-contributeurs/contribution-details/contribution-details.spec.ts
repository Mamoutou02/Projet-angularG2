import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContributionModalComponent } from './contribution-details'; 

describe('ContributionModalComponent', () => {
  let component: ContributionModalComponent;
  let fixture: ComponentFixture<ContributionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContributionModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContributionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
