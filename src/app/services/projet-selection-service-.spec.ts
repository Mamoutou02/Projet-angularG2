import { TestBed } from '@angular/core/testing';

import { ProjetSelectionService } from './projet-selection-service-';

describe('ProjetSelectionService', () => {
  let service: ProjetSelectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjetSelectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
