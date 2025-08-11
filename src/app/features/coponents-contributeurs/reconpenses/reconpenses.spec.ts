import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Reconpenses } from './reconpenses';

describe('Reconpenses', () => {
  let component: Reconpenses;
  let fixture: ComponentFixture<Reconpenses>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Reconpenses]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Reconpenses);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
