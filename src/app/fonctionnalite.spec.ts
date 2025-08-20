import { TestBed } from '@angular/core/testing';

import { Fonctionnalite } from './fonctionnalite';

describe('Fonctionnalite', () => {
  let service: Fonctionnalite;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Fonctionnalite);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
