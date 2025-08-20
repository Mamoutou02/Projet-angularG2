import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetRecents } from './projet-recents';

describe('ProjetRecents', () => {
  let component: ProjetRecents;
  let fixture: ComponentFixture<ProjetRecents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjetRecents]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjetRecents);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
