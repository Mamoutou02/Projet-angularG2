import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsComponent } from './notifications';
// Notez l'ajout de 'Component' et l'extension '.component'
describe('NotificationsComponent', () => { // Renommez ici aussi
  let component: NotificationsComponent;  // Utilisez le bon nom
  let fixture: ComponentFixture<NotificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotificationsComponent] // 'declarations' au lieu de 'imports'
    }).compileComponents();

    fixture = TestBed.createComponent(NotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
