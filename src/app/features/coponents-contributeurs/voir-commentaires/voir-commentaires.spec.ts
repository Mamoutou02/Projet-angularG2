import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoirCommentaires } from './voir-commentaires';

describe('VoirCommentaires', () => {
  let component: VoirCommentaires;
  let fixture: ComponentFixture<VoirCommentaires>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoirCommentaires]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoirCommentaires);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
