import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewContribution } from './new-contribution';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { FileUploadService } from './file-upload.service';
import { FormsModule } from '@angular/forms';

describe('NewContribution', () => {
  let component: NewContribution;
  let fixture: ComponentFixture<NewContribution>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewContribution, FormsModule],
      providers: [
        provideHttpClient(),
        provideRouter([]),
        FileUploadService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NewContribution);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.contribution).toEqual({
      icon: 'fa-lock',
      title: '',
      description: '',
      fonctionnalite: '',
      contenu: '',
      fichier: null,
      date: jasmine.any(String),
      status: 'pending',
      statusText: 'En attente',
      auteur: ''
    });
    expect(component.uploadProgress).toBeNull();
    expect(component.isUploading).toBeFalse();
  });

  it('should handle file selection', () => {
    const mockFile = new File([''], 'test.pdf', { type: 'application/pdf' });
    const event = {
      target: {
        files: [mockFile]
      }
    } as unknown as Event;

    component.onFileSelected(event);
    expect(component.contribution.fichier).toEqual(mockFile);
  });
});
