import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PupPopmenu } from './pup-popmenu';

describe('PupPopmenu', () => {
  let component: PupPopmenu;
  let fixture: ComponentFixture<PupPopmenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PupPopmenu]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PupPopmenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
