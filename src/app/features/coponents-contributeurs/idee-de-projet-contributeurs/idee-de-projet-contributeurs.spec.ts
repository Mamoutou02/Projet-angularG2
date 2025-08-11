import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdeeDeProjetContributeursComponent} from './idee-de-projet-contributeurs';

describe('IdeeDeProjetContributeurs', () => {
  let component: IdeeDeProjetContributeursComponent;
  let fixture: ComponentFixture<IdeeDeProjetContributeursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdeeDeProjetContributeursComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IdeeDeProjetContributeursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
