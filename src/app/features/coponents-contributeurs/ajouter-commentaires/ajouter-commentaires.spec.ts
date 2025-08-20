import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterCommentaires } from './ajouter-commentaires';

describe('AjouterCommentaires', () => {
  let component: AjouterCommentaires;
  let fixture: ComponentFixture<AjouterCommentaires>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjouterCommentaires]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterCommentaires);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
