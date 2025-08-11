import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MesContributionsContributeurs } from './mes-contributions-contributeurs';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule } from '@angular/router';

@Component({
   selector: 'app-fonctionnalites',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: '<div>Fonctionnalites works!</div>'
})

export class Fonctionnalites {
}

describe('MesContributionsContributeurs', () => {
  let component: MesContributionsContributeurs;
  let fixture: ComponentFixture<MesContributionsContributeurs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MesContributionsContributeurs, RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(MesContributionsContributeurs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display contributions', () => {
    component.contributions = [{
      icon: 'fa-test',
      title: 'TEST CONTRIBUTION',
      date: '01 Jan 2023',
      description: 'Test description',
      status: 'approved',
      statusText: 'Test',
      auteur: 'Test User'
    }];
    fixture.detectChanges();

    const cards = fixture.nativeElement.querySelectorAll('.card');
    expect(cards.length).toBe(1);
    expect(cards[0].textContent).toContain('TEST CONTRIBUTION');
  });

  it('should switch tabs', () => {
    expect(component.activeTab).toBe('contribution');
    component.switchTab('features');
    expect(component.activeTab).toBe('features');
  });
});
